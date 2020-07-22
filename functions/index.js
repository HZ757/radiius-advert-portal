const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();
const FieldValue = require('firebase-admin').firestore.FieldValue;

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 exports.updateFollowerDoc = functions.firestore.document('consumers/{docID}/followers/{followerDocID}').onUpdate((change, context) => {
  var oldData = change.before.data(); 
  var newData = change.after.data();
  var diff = newData.followers.length - oldData.followers.length; 
  var owner = newData.owner;
	if (diff > 0){
		
		db.doc('consumers/' + owner).update({'followerCount': FieldValue.increment(diff)});
		
	}
	if (diff < 0) {
		db.doc('consumers/' + owner).update({'followerCount': FieldValue.decrement(diff)});
	}
});

exports.newFollowerDoc = functions.firestore.document('consumers/{docID}/followers/{followerDocID}').onCreate((snap, context) => {
 
  var newFollowers = snap.data().followers.length;
 var owner = snap.data().owner;
  db.doc('consumers/' + owner).update({'followerCount': FieldValue.increment(newFollowers)});  

	
});

exports.deleteFollowerDoc = functions.firestore.document('consumers/{docID}/followers/{followerDocID}').onDelete((snap, context) => {
 
  var deletedFollowers = snap.data().followers.length;
	var owner = snap.data().owner;	
  db.doc('consumers/' + owner).update({'followerCount': FieldValue.decrement(deletedFollowers)});  

	
});