import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './courses.entity';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'NestJS',
      description: 'Curso sobre fundamentos do NestJS',
      tags: ['node.js', 'nestjs', 'javacript', 'typescript'],
    },
  ];

  findAll() {
    return this.courses;
  }

  findOne(id: number) {
    const course = this.courses.find((course) => course.id === id);

    if (!course) {
      throw new NotFoundException(`Course ID ${id} not found`);
    }

    return course;
  }

  create(createCourseDto: any) {
    this.courses.push(createCourseDto);

    return createCourseDto;
  }

  update(id: number, updateCourseDto: any) {
    const existingCourse = this.findOne(id);

    if (existingCourse as any) {
      const index = this.courses.findIndex((course) => course.id === id);

      this.courses[index] = {
        id,
        ...updateCourseDto,
      };
    }
  }

  remove(id: number) {
    const index = this.courses.findIndex((course) => course.id === id);

    if (index >= 0) {
      this.courses.splice(index, 1);
    }
  }
}
