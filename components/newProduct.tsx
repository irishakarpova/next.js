import { Task } from "../generated/frontend-graphql";
import style from "../styles/Home.module.css";

interface Props {
  task: Task;
}
const NewTask: React.FC<Props> = ({ task }) => {
  return (
    <article className={style.infoBlock}>
      <div className={style.descriptionBlock}>
        <div className={style.taskLocation}>{task.location}</div>
        <h4 className={style.taskTitle}>{task.title}</h4>
        <p>{task.category}</p>
        <p>{task.id}</p>
      </div>

      <div>adbcxdnbm</div>
    </article>
  );
};

export default NewTask;
