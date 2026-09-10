import SectionHeading from './SectionHeading'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'

/** 项目区：按时间倒序的索引式列表，也是首页最主要的信息承载。 */
function Projects() {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="01"
          title="项目"
          lede="三个后端项目：架构分层、关键取舍，以及带出处的关键数字。"
        />

        <div className="mt-16 space-y-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
