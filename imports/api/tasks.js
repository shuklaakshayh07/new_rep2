import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks ');

export const Tasks2 = new Mongo.Collection('tasks12');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('tasks', function tasksPublication() {

      return Tasks2.find({
        $or: [
          { private: { $ne: true } },
          { owner: this.userId },
        ],
      });
  });
}

Meteor.methods({
  'tasks.insert'(temp) {
    check(temp, Object);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks2.insert({
      text:temp.text,
      priority:temp.pr,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
      updatedAt:null,
    });
  },
  'tasks.remove'(taskId) {
    check(taskId, String);
    const task = Tasks2.findOne(taskId);
  if (task.private && task.owner !== Meteor.userId()) {
    // If the task is private, make sure only the owner can delete it
    throw new Meteor.Error('not-authorized');
  }
    Tasks2.update(taskId,{$set:{delete:true}})
  },
  'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
    const task = Tasks2.findOne(taskId);
   if (task.private && task.owner !== Meteor.userId()) {
     // If the task is private, make sure only the owner can check it off
     throw new Meteor.Error('not-authorized');
   }
    Tasks2.update(taskId, { $set: { checked: setChecked } });
  },
   'tasks.setPrivate'(taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);

    const task = Tasks2.findOne(taskId);

    // Make sure only the task owner can make a task private
    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks2.update(taskId, { $set: { private: setToPrivate } });
  },
  'tasks.edit'(taskId, updateTask,updatePr){
      check(taskId, String);
      check(updateTask, String);
      const task=Tasks2.findOne(taskId);
     // console.log(taskId);
      Tasks2.update(taskId, { $set: { text: updateTask } });

      Tasks2.update(taskId, { $set:{priority: updatePr} });
      Task.update(taskId,{$set:{updated: new Date()}})
      console.log("in tasks.edit(meteor)");
  }
});
