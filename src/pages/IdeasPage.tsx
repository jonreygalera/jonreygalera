import React from 'react';
import PhotoCard from '../components/photoCard/PhotoCard';
import PhotoCardGroup from '../components/photoCard/PhotoCardGroup';
import Box from '../components/box/Box';
import ProjectCardContainer from '../features/projectCardContainer/ProjectCardContainer';
import Carousel from '../components/carousel/Carousel';
import Typography from '../components/typography/Typography';
import Button from '../components/button/Button';
import Splatter from '../components/icons/Splatter';

interface Props {

}
const IMAGE_SETS = [
  "https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
  "https://i0.wp.com/picjumbo.com/wp-content/uploads/man-looking-into-the-distance-on-top-of-the-mountain-free-image.jpg?w=600&quality=80",
];

const SAMPLE_DATA = [
  {
    key: 'my-project-1',
    imageSets: IMAGE_SETS,
    title: 'My Project'
  }, {
    key: 'my-project-2',
    imageSets: IMAGE_SETS,
    title: 'My Project'
  }, {
    key: 'my-project-3',
    imageSets: IMAGE_SETS,
    title: 'My Project'
  }
]


const IdeasPage: React.FC<Props> = (props) => {

  return (
    <Box className='h-screen relative'>

      <Box className='absolute -z-10'>
        <Typography variant='h1' className="text-[250px] text-primary-300">
          Project
        </Typography>
      </Box>
      <Box className='flex flex-col  rounded-3xl my-8 mr-10 h-2/3 overflow-hidden border'>
        <Box className='flex justify-center w-full'>
          <Box className='flex justify-center items-center bg-primary-950 w-48 h-14 rounded-b-3xl'>
            <Typography className='text-primary-50 underline'>Ideas</Typography>
          </Box>
        </Box>

        <Box className='flex h-full w-full '>
          <Box className='flex flex-col w-full p-10 gap-10'>
            <Box className='flex w-full flex-col gap-5'>
              <Box>
                <Typography variant='h1' className="text-9xl">
                  Project
                </Typography>
              </Box>
              <Box>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eros nulla, eleifend pretium magna ut, 
                  consectetur dictum lacus. Vivamus fringilla, sapien at maximus suscipit, orci dolor pharetra nunc, 
                  quis sagittis quam sapien eu ipsum. Phasellus blandit efficitur libero id mattis. 
                </Typography>
              </Box>
            </Box>

            <hr className='mr-24'/>
            <Box className='flex w-full'>
              dasdsds
            </Box>
          </Box>

          <Box className='flex flex-col w-full gap-2 '>
            <Box className='
                flex
                rounded-3xl
                relative
                justify-center
              '
            >
              <Splatter className='absolute w-full rotate-180 -translate-y-32 -z-10'/>
              <img 
                src="https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg" 
                className='
                  w-2/3 
                  h-[370px] 
                  rounded-3xl 
                  shadow-2xl 
                  shadow-primary-700
                  hover:rotate-6
                  transition
                  duration-700
                '
              />
            </Box>

            <Box className="flex gap-2">
              <Button className='flex h-full w-[100px] border items-center rounded-s-2xl'>
                {'<'}
              </Button>
              {
                IMAGE_SETS.map(data => (
                  <img src={data} className='w-44 h-36'/>
                ))
              }
            </Box>
          </Box>

        </Box>
      </Box>

      <Box className="h-1/4 flex gap-2">
        <Button className='flex h-full w-[100px] border items-center rounded-s-2xl'>
            {'<'}
        </Button>
        <Box className='flex w-full overflow-x-hidden overflow-y-visible gap-2'>
          <ProjectCardContainer title={'Project'}/>
          <ProjectCardContainer title={'Project'}/>
          <ProjectCardContainer title={'Project'}/>
          <ProjectCardContainer title={'Project'}/>
          <ProjectCardContainer title={'Project'}/>
        </Box>
      </Box>
    </Box>
  );
}

export default IdeasPage;
