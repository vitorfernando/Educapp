let functions = require('firebase-functions');
let admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.sendGradePush = functions.database.ref('/studentSubjects/{studentID}/{subjectID}/{testID}').onWrite(event => {
    const subjectID = event.params.subjectID;
    const studentID = event.params.studentID;
    //var subjectName = '';

    let grade = event.data.val();
    
    /*admin.database().ref('subjects/').orderByKey().equalTo(subjectID).on('child_added', snapshot => {
        setTimeout(() => {
            subjectName = snapshot.val().name;
        }, 4000);
        
    });

    let token = '';
    admin.database().ref('students/' + studentID).orderByChild('registrationId').on('child_added', snap => {
        //console.log(snap.val().registrationId);
        setTimeout(() => {
            token = snap.val().registrationId;
        }, 4000);
    });*/
    let msg = 'Você tem novas notas';
    console.log(msg);
    //console.log(subjectName + ' - ' + token);

    
    return loadStudent(studentID).then(users => {
        let tokens = [];
        for (let user of users) {
            tokens.push(user.pushToken);
        }
        let payload = {
            notification: {
                title: 'Notas',
                body: msg,
                sound: 'default',
                badge: '1'
            }
        };
        return admin.messaging().sendToDevice(tokens, payload);
    });
});

exports.sendParentPush = functions.database.ref('/professorClass/{professorID}/{classID}/{subjectID}/{aulaID}/presentes/{studentID}').onWrite(event => {
    const subjectID = event.params.subjectID;
    const studentID = event.params.studentID;
    //var subjectName = '';

    let aula = event.data.val();
    
    /*admin.database().ref('subjects/').orderByKey().equalTo(subjectID).on('child_added', snapshot => {
        setTimeout(() => {
            subjectName = snapshot.val().name;
        }, 4000);
        
    });

    let token = '';
    admin.database().ref('students/' + studentID).orderByChild('registrationId').on('child_added', snap => {
        //console.log(snap.val().registrationId);
        setTimeout(() => {
            token = snap.val().registrationId;
        }, 4000);
    });*/
    let msg = 'Seu filho está presente na aula';
    console.log(msg);
    //console.log(subjectName + ' - ' + token);

    
    return loadStudent(studentID).then(users => {
        let tokens = [];
        for (let user of users) {
            tokens.push(user.parentToken);
        }
        let payload = {
            notification: {
                title: 'Controle',
                body: msg,
                sound: 'default',
                badge: '1'
            }
        };
        return admin.messaging().sendToDevice(tokens, payload);
    });
});


function loadStudent(id) {
	let dbRef = admin.database().ref('/students/').orderByKey().equalTo(id);
	let defer = new Promise((resolve, reject) => {
		dbRef.once('value', (snap) => {
			let data = snap.val();
      let users = [];
      for (var property in data) {
	      users.push(data[property]);
      }
			resolve(users);
		}, (err) => {
			reject(err);
		});
	});
	return defer;
}
