import React, { useState } from 'react';
import PhotoCard from '../components/photoCard/PhotoCard';
import PhotoCardGroup from '../components/photoCard/PhotoCardGroup';
import Box from '../components/box/Box';
import ProjectCardContainer from '../features/projectCardContainer/ProjectCardContainer';
import Carousel from '../components/carousel/Carousel';
import Typography from '../components/typography/Typography';
import Button from '../components/button/Button';
import Splatter from '../components/icons/Splatter';
import Chip from '../components/chip/Chip';
import {
 ArrowRightIcon
} from '@heroicons/react/24/outline';
import IconButton from '../components/iconButton/IconButton';
import Slide from '../components/slide/Slide';

interface Props {

}
const IMAGE_SETS = [
  {
    id: 1,
    source: "https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg",
  },
  {
    id: 2,
    source: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg",
  },
  {
    id: 3,
    source: "https://i0.wp.com/picjumbo.com/wp-content/uploads/man-looking-into-the-distance-on-top-of-the-mountain-free-image.jpg?w=600&quality=80",
  },
  {
    id: 4,
    source: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
  },
  {
    id: 5,
    source: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
  },
  {
    id: 6,
    source: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
  },
];


const SAMPLE_DATA = [
  {
    key: 'my-project-1',
    title: 'Project I',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eros nulla, eleifend pretium magna ut, consectetur dictum lacus. Vivamus fringilla, sapien at maximus suscipit.",
    imageSets: IMAGE_SETS,
  }, {
    key: 'my-project-2',
    title: 'Project II',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eros nulla, eleifend pretium magna ut, consectetur dictum lacus. Vivamus fringilla, sapien at maximus suscipit.",
    imageSets: IMAGE_SETS,
  }, {
    key: 'my-project-3',
    title: 'Project III',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eros nulla, eleifend pretium magna ut, consectetur dictum lacus. Vivamus fringilla, sapien at maximus suscipit.",
    imageSets: IMAGE_SETS,
  }, {
    key: 'my-project-4',
    title: 'Project IV',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eros nulla, eleifend pretium magna ut, consectetur dictum lacus. Vivamus fringilla, sapien at maximus suscipit.",
    imageSets: IMAGE_SETS,
  }
]


const IdeasPage: React.FC<Props> = (props) => {

  const [ selectedProject, setSelectedProject ] = useState(SAMPLE_DATA[0]);
  const [ selectedProjectImage, setSelectedProjectImage ] = useState(selectedProject.imageSets[0]);

  return (
    <Box className='h-screen relative'>

      <Box 
        className='
          absolute
          -z-10
        '
      >
        <Typography 
          variant='h1' 
          className="text-[250px] text-primary-50 text-stroke-light">
          {selectedProject.title}
        </Typography>
      </Box>
      <Box className='absolute -z-10 w-8/12 h-[400px] blur-lg inset-0 bg-gradient-to-t from-primary-400 via-transparent to-transparent opacity-25'>
      </Box>
      <Box className='flex flex-col rounded-3xl my-8 mr-10 h-2/3 overflow-hidden border-primary-950 border-t-2 shadow-md shadow-primary-300'>
        <Box className='flex justify-center w-full'>
          <Box className='flex justify-center items-center bg-primary-950 w-48 h-14 rounded-b-3xl'>
            <Typography className='text-primary-50 underline'>Ideas</Typography>
          </Box>
        </Box>

        <Box className='flex h-full w-full '>
          <Box className='flex flex-col w-full p-10 gap-10'>
            <Box className='flex w-full flex-col gap-5'>
              <Box>
                <Typography variant='title'>
                  {selectedProject.title}
                </Typography>
              </Box>
              <Box>
                <Typography variant='h5'>
                  {selectedProject.description}
                </Typography>
              </Box>
            </Box>

            <hr className='mr-24 border-primary-300'/>

            <Box className='flex w-full h-full relative'>
              <Box className='grid grid-cols-3 gap-x-2 gap-y-0 w-full border border-primary-400 rounded-br-[35px] p-2 rounded-s-lg'>
                <Chip/>
                <Chip/>
                <Chip/>
                <Chip/>
                <Button className='w-10'>More</Button>
              </Box>

              <Box className='absolute flex items-center gap-2 bottom-0 right-0 w-[300px]'>
                <Slide
                  className='w-full'
                  label={'Slide to Visit'}
                  labelSlided={'Visited!'}
                  onSlided={() => alert('das')}
                />
              </Box>
            </Box>
          </Box>

          <Box className='flex flex-col w-full gap-2 '>
            <Box className='
                flex
                rounded-3xl
                relative
                justify-center
                mb-2
              '
            >
              <Splatter className='absolute w-full rotate-180 -translate-y-32 -z-10'/>
              <img 
                src={selectedProjectImage.source}
                className='
                  w-2/3 
                  h-[370px] 
                  rounded-3xl 
                  shadow-2xl 
                  shadow-primary-700
                  hover:rotate-6
                  hover:scale-90
                  transition
                  duration-700
                  cursor-pointer
                '
              />
            </Box>
            <Carousel
              onItemSelected={(child) => {
                const propsChild : any = React.isValidElement(child) ? (child?.props ?? null) : null;
                const dataImage: any = selectedProject.imageSets.find(imgSet => imgSet.id === propsChild['data-content']['id']);
                setSelectedProjectImage(dataImage)
              }}
              CarouselContainerProps={{
                className: 'flex mr-1'
              }}
            >
              {
                selectedProject.imageSets.map(data => (
                  <img src={data.source} className='w-44 h-36' data-content={data}/>
                ))
              }
            </Carousel>
          </Box>

        </Box>
      </Box>
      <Carousel 
        CarouselContainerProps={{
          className: "h-1/4 flex gap-2 mr-10"
        }}
      >
          <ProjectCardContainer title={'Project'} active={true}/>
          <ProjectCardContainer title={'Project'}/>
          <ProjectCardContainer title={'Project'}/>
          <ProjectCardContainer title={'Project'}/>
          <ProjectCardContainer title={'Project'}/>
        </Carousel>
    </Box>
  );
}

export default IdeasPage;
