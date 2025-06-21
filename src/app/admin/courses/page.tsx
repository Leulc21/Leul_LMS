"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock, Plus, Users } from "lucide-react";
import { useRouter } from "next/navigation";

const Courses = () => {
  const router = useRouter();

  const courses = [
    {
      id: "1",
      title: "Introduction to React",
      smallDescription:
        "Learn the fundamentals of React including components, state, and props.",
      duration: 8,
      level: "BEGINNER",
      students: 45,
    },
    {
      id: "2",
      title: "Advanced JavaScript",
      smallDescription:
        "Master advanced JavaScript concepts like closures, promises, and async/await.",
      duration: 12,
      level: "ADVANCED",
      students: 32,
    },
    {
      id: "3",
      title: "UI/UX Design Principles",
      smallDescription:
        "Learn the core principles of user interface and user experience design.",
      duration: 6,
      level: "INTERMEDIATE",
      students: 28,
    },
  ];

  const handleCreateCourse = () => {
    router.push("/dashboard/courses/create"); // Adjust route as needed
  };

  return (
    <div className="min-h-screen bg-background container py-8">
      {/* Page Title */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage and view all your created courses
          </p>
        </div>
        <Button onClick={handleCreateCourse}>
          <Plus className="w-4 h-4 mr-2" />
          Create Course
        </Button>
      </div>

      {/* Courses Grid */}
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card
              key={course.id}
              onClick={() => router.push(`/dashboard/courses/${course.id}`)}
              className="hover:shadow-md transition-shadow cursor-pointer"
            >
              <CardHeader className="pb-4">
                <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <BookOpen className="h-10 w-10 text-muted-foreground" />
                </div>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <Badge variant="secondary" className="capitalize mt-1 w-fit">
                  {course.level.toLowerCase()}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {course.smallDescription}
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students} students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration} hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No courses yet</h3>
          <p className="text-muted-foreground mb-4">
            Get started by creating your first course
          </p>
          <Button onClick={handleCreateCourse}>
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Course
          </Button>
        </div>
      )}
    </div>
  );
};

export default Courses;
