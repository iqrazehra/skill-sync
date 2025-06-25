import { Grid } from "@mui/material";
import CourseCard from "./CourseCard";

interface CourseRowProps {
    courses: any[];
    setReload: () => void;
    view?: string;
}

export const CourseCardRow = ({courses, view, setReload}: CourseRowProps) => {
    return (
      <Grid container spacing={2}>
        {courses.map((course: any) => (
          <Grid item key={course.course_id} xs={12} sm={6} md={4} lg={3}>
            <CourseCard
              view={view}
              courseId={course.course_id}
              ratings={course.ratings}
              imageSrc={course.image_url}
              videoUrl={course.video_url}
              title={course.course_title}
              instructor={course.teacher_name}
              favorite={course.favorite}
              enrolled={course.enrolled}
              setReload={setReload}
            />
          </Grid>
        ))}
      </Grid>
    );
  };