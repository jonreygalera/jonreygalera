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

  const [ selectedProject, setSelectedProject ] = useState<IProject>(dataProjectModel.length > 0 ? dataProjectModel[0] : DRAWBACK_SELECTED_PROJECT);
  const [ selectedProjectImage, setSelectedProjectImage ] = useState<IImageSet | null | undefined>((selectedProject?.imageSets as IImageSet[]).length > 0 ? (selectedProject?.imageSets as IImageSet[])[0] : DRAWBACK_SELECTED_PROJECT_IMAGE);

  const imageSets = useMemo(() => {
    return selectedProject.imageSets ?? []
  }, [selectedProject]);

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
      <Box className='flex gap-2 mt-2 h-[850px] overflow-hidden'>
        <Box className='flex-grow wide-screen:px-28'>
          <Box className='grid grid-cols-2 gap-2 h-[850px] pb-5 overflow-scroll '>
            {
              dataProjectModel?.map((data: IProject) => {
                return (
                  <ProjectCardContainer 
                    key={`project-container-${data?.key}`}
                    active={data?.key === selectedProject.key}
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
        <InfiniteScroll>
          {
            dataTechStackModel.map((techStack, idx) => (
              <Box className='flex items-center gap-2 w-[150px] rotate-90'>
                <Typography 
                  variant='title' 
                  className={
                    tailwindUtil(
                      'text-primary-50',
                    )
                  }
                >
                  {techStack.label}
                </Typography>
              </Box>
            ))
          }
       </InfiniteScroll>
      </Box>
    </Box>
  );
}

export default IdeasPage;
