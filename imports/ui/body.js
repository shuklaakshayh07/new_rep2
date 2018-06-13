import { Meteor } from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Tasks} from '../api/tasks.js';
import {Tasks2} from '../api/tasks.js';
import './body.html';
import './task.js';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});
 Meteor.subscribe('tasks');
Template.body.helpers({
    tasks() {
        //return Tasks.find({});
        const instance = Template.instance();
                          console.log("over here");
                                if(instance.state.get('deleted'))
                                {
                                        if(instance.state.get('date_sort'))
                                        {
                                            if (instance.state.get('hideCompleted'))
                                                {
                                            return Tasks2.find({delete:{$eq:true}},{ checked: { $ne: true } }, { sort: { createdAt: -1 } });
                                                }
                                         return Tasks2.find({delete:{$eq:true}} ,{sort:{createdAt:-1}});
                                        }
                                        if(instance.state.get('pr_sort'))
                                        {
                                                    console.log("over here2");
                        //          If hide completed is checked, filter tasks
                                                    if (instance.state.get('hideCompleted'))
                                                    {
                                                return Tasks2.find({delete:{$eq:true}},{ checked: { $ne: true } }, { sort: { priority: 0 } });
                                                    }
                                        return Tasks2.find({delete:{$eq:true}}, { sort: { priority:0}});
                                        }

                               }
                            if(instance.state.get('date_sort'))
                            {
                                if (instance.state.get('hideCompleted'))
                                    {
                                return Tasks2.find({delete:{$ne:true}},{ checked: { $ne: true } }, { sort: { createdAt: -1 } });
                                    }
                             return Tasks2.find({delete:{$ne:true}} ,{sort:{createdAt:-1}});
                            }
                        if(instance.state.get('pr_sort'))
                         {
                                        console.log("over here2");
            //          If hide completed is checked, filter tasks
                                        if (instance.state.get('hideCompleted'))
                                        {
                                    return Tasks2.find({delete:{$ne:true}},{ checked: { $ne: true } }, { sort: { priority: 0 } });
                                        }
                            return Tasks2.find({delete:{$ne:true}}, { sort: { priority:0}});
                        }




                        return Tasks2.find({delete:{$ne:true}}, { sort: { createdAt: -1 } });

    },
    incompleteCount() {
    return Tasks2.find({ checked: { $ne: true } }).count();
  },
    completeCount(){
        return Tasks2.find({ checked:{ $eq: true}}).count();   //?? how to call memeber function??????????????????????????????
    },

});

Template.body.events({

    'click .button1'(event) {
        event.preventDefault();
        console.log('ta');
        const priority=document.getElementById("pr_no").value;
        console.log(priority);
        const task_text=document.getElementById("name_task").value;
        console.log(task_text);

        var temp;temp={text:task_text,pr:priority};
        console.log(temp);

    Meteor.call('tasks.insert', temp);


    },
    'change .hide-completed input'(event,instance) {

        instance.state.set('hideCompleted',event.target.checked);
        console.log(instance);

    },
    'click .pr_sort'(event,instance) {
        console.log("click1");
        console.log(event);
        instance.state.set('pr_sort',true);
        instance.state.set('date_sort',false);
        console.log(instance);
    },

    'click .date_sort'(event,instance) {console.log("click2");
        instance.state.set('date_sort',true);
        instance.state.set('pr_sort',false);
    },
    'click .show-delete'(event,instance){

        instance.state.set('deleted',event.target.checked);
    },
    'click .open_button'(event,instance){
    document.getElementById("mySidenav").style.width = "250px";
    event.state.set('todo',true);
    event.state.set('doing',false);
    event.state.set('done',false);
},

    'click .closebtn'(event,instance){
    document.getElementById("mySidenav").style.width = "0";
}
// 'click .todo'(event,instance){
//         event.state.set('todo',true);
//         event.state.set('doing',false);
//         event.state.set('done',false);
//         },
// 'click .doing'(event,instance){
//     event.state.set('todo',false);
//     event.state.set('doing',true);
//     event.state.set('done',false);
// },
// 'click.done1'(event,instance){
//         event.state.set('todo',false);
//         event.state.set('doing',false);
//         event.state.set('done',true);
// }

});
