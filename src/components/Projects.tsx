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
          lede="三个后端项目的完整工程记录：架构分层、关键技术决策、压测数据与出处，以及我已知的短板。每条性能指标都标了原始来源。"
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
