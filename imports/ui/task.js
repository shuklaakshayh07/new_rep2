import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';
import { Tasks2 } from '../api/tasks.js';

import './task.html';

Template.task.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});
Template.task.events({
    'click .toggle-checked'() {
      // Set the checked property to the opposite of its current value
      Meteor.call('tasks.setChecked', this._id, !this.checked);
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
    'click .delete'() {

      Meteor.call('tasks.remove', this._id);
    },
    'click .toggle-private'() {
    Meteor.call('tasks.setPrivate', this._id, !this.private);
  },
   'submit.prclass'()
   {  const target=event.target;
       const value=target.priority.value;

           Tasks2.update(this._id, {
             $set: { priority: value },
           });

   },

   'change .del-completed input'(event,instance) {


       instance.state.set('deleted',true);
       console.log(instance);

   },
   'click.toggle-update'()//todo
   {
       document.getElementById("edit-task").style.display = "block";
       document.getElementById("edit_button").style.display="none";
       document.getElementById("save_button").style.display="block";
    //    document.getElementById("update_option").style.display="block";
    //    $('.edit-task input').css('display','block');
   },
   'click.toggle-save'()
   {   event.preventDefault();
       const updateTask=document.getElementById("update_task").value;
        const updatePr=document.getElementById("update_pr_no").value;
       Meteor.call('tasks.edit',this._id,updateTask,updatePr);
       document.getElementById("edit-task").style.display = "none";
       document.getElementById("edit_button").style.display="block";
       document.getElementById("save_button").style.display="none";
    //    $('.edit-task input').css('display','none');

   }
 /*  'click.update_option'()
   {
       document.getElementById("edit-task").style.display = "none";
       document.getElementById("edit_button").style.display="block";
       document.getElementById("save_button").style.display="none";
       document.getElementById("update_option").style.display="none";
   }*/

});
