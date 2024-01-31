export default interface ScheduleItem{
  scheduleId : bigint;
  userId : bigint ;
  teamId : bigint | null;
  title : string;
  content : string | null;
  writeDate : string | null;
  scheduleCheck : boolean;
  schedulePriority : bigint;
  scheduleFinishdate : Date;
  scheduleType : string;
}