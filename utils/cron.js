const schedule = require('node-schedule');
const { createNotification } = require('../services/notification.service');

const addProblemReminderNotificationCronJob = (job_id, user_id)=>{
  
    schedule.scheduleJob(`${job_id} => ${user_id}`,"* * * * 1 *",async function(){
        let obj = {
            description:"Votre Annonce est expiré. Vous pouvez la renouveler ou la retrier en cliquant ici.",
            type:"end",
            job_id:job_id,
            id_owner:user_id,
            id_receiver:user_id,
            is_checked:false
        }
        const notif = await createNotification(obj);
    })

}

module.exports = {
    addProblemReminderNotificationCronJob
}