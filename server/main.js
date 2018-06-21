import '../imports/api/tasks.js';

import { Meteor } from 'meteor/meteor';
import ServiceConfiguration from 'meteor/service-configuration';

Meteor.startup(() => {
 // code to run on server at startup
 console.log("1");
 console.log(ServiceConfiguration);


//  ServiceConfiguration.configurations.remove({
//    service: "google"
//  });
//
//
// ServiceConfiguration.configurations.upsert(
//    { service: "google" },
//    {
//        $set: {
//            clientId: "209588748425-kdra14v9vcpclapgkkuvmpcldv2jfs6q.apps.googleusercontent.com",
//            secret: "9fgga9dIbZyw_x71yQiI31A5",
//             loginStyle: "popup",
//        }
//    }
// );


            Accounts.loginServiceConfiguration.remove({
               service : 'google'
           });

           Accounts.loginServiceConfiguration.insert({
               service     : 'google',
               clientId: "209588748425-kdra14v9vcpclapgkkuvmpcldv2jfs6q.apps.googleusercontent.com",
               secret:"9fgga9dIbZyw_x71yQiI31A5"
           });

           Accounts.loginServiceConfiguration.remove({
                          service : 'linkedin'
                      });

           Accounts.loginServiceConfiguration.insert({
                          service     : 'linkedin',
                          clientId: "81e5dc7ahzt11f",
                          secret:"JUeOsnRPJ8I1FPg6"
                      });
           Accounts.loginServiceConfiguration.remove({
                         service : 'twitter'
                     });
           Accounts.loginServiceConfiguration.insert({
                        service     : 'twitter',
                        clientId: "81e5dc7ahzt11f",
                        secret:"JUeOsnRPJ8I1FPg6"
                      });


});
