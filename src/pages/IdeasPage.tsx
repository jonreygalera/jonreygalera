import React, { useMemo, useState } from 'react';
import Box from '../components/box/Box';
import ProjectCardContainer from '../features/projectCardContainer/ProjectCardContainer';
import Carousel from '../components/carousel/Carousel';
import Typography from '../components/typography/Typography';
import Button from '../components/button/Button';
import Chip from '../components/chip/Chip';
import Slide from '../components/slide/Slide';
import ProjectModel from '../lib/models/projectModel';
import { useProjectModelHook } from '../hooks/useProjectModelHook';
import IProject from '../interface/IProject';
import IImageSet from '../interface/IImageSet';
import PreviewProjectPanel from '../features/previewProjectPanel/PreviewProjectPanel';
import HighlightCarousel from '../components/carousel/HighlightCarousel';
import { tailwindUtil } from '../utils/tailwindUtil';
import InfiniteScroll from '../components/carousel/InfiniteScroll';
import { useTechStackModelHook } from '../hooks/useTechStackModelHook';
import Dialog from '../components/dialog/Dialog';

interface Props {

}

const DRAWBACK_SELECTED_PROJECT_IMAGE : IImageSet = {
  id: 0,
  source: "https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg",
};

const DRAWBACK_SELECTED_PROJECT : IProject = {
  "id": 0,
  "key": "empty",
  "title": "Empty",
  "description": "",
  "version": "",
  "tags": [""],
  "roles": [""],
  "imageSets": [DRAWBACK_SELECTED_PROJECT_IMAGE],
};

const IdeasPage: React.FC<Props> = (props) => {

  const { data: dataProjectModel } = useProjectModelHook({ key: 'all', value: 'all'})
  const { data: dataTechStackModel } = useTechStackModelHook({ key: 'all', value: 'all'})

  const [ selectedProject, setSelectedProject ] = useState<IProject | null>(null);
  // const [ selectedProjectImage, setSelectedProjectImage ] = useState<IImageSet | null | undefined>((selectedProject?.imageSets as IImageSet[]).length > 0 ? (selectedProject?.imageSets as IImageSet[])[0] : DRAWBACK_SELECTED_PROJECT_IMAGE);

  // const imageSets = useMemo(() => {
  //   return selectedProject?.imageSets ?? []
  // }, [selectedProject]);

  return (
    <Box className='relative mt-5'>
      <HighlightCarousel title='Ideas'>
        {
          dataProjectModel?.map((data: IProject) => {
            return (
             <Box
              className='w-full relative'
             >
               <PreviewProjectPanel 
                title='Ideas'
                data={data}
              />
             </Box>
            )
          })
        }
      </HighlightCarousel>
      <Box className='flex gap-2 mt-2 mb-10 h-full'>
        <Box className='flex-grow wide-screen:px-28'>
          <Box>
            <Box className='p-5 border-b border-primary-300 bg-primary-950'>
              <Typography variant='h1' className='text-primary-300'>Projects</Typography>
            </Box>
            <Box className='grid grid-cols-2 gap-2 pb-5'>
              {
                dataProjectModel?.map((data: IProject) => {
                  return (
                    <ProjectCardContainer 
                      key={`project-container-${data?.key}`}
                      active={data?.key === selectedProject?.key}
                      data={data}
                      onClickView={() => {
                        setSelectedProject(data)
                      }}
                    />
                  )
                })
              }
            </Box>
            <Box className='p-5 border-b border-primary-300 bg-primary-950'>
              <Typography variant='h1' className='text-primary-300'>Experimental</Typography>
            </Box>
            <Box className='grid grid-cols-2 gap-2 pb-5'>
              {
                dataProjectModel?.map((data: IProject) => {
                  return (
                    <ProjectCardContainer 
                      key={`project-container-${data?.key}`}
                      active={data?.key === selectedProject?.key}
                      data={data}
                      onClickView={() => {
                        setSelectedProject(data)
                      }}
                    />
                  )
                })
              }
            </Box>
          </Box>

        </Box>
        <InfiniteScroll>
          {dataTechStackModel.map((techStack, idx) => (
            <Typography
              variant="title"
              className=" text-primary-50"
            >
            {techStack.label}
          </Typography>
          ))}
        </InfiniteScroll>

      </Box>

      {/* Dialog */}
      <Dialog 
        isOpen={Boolean(selectedProject)} 
        title={' '}
        onClose={() => setSelectedProject(null)}
      >
        <Box>
          <PreviewProjectPanel 
            data={selectedProject}
          />
        </Box>
      </Dialog>
    </Box>
  );
}

export default IdeasPage;
