import React from 'react';
import Box from '../../components/box/Box';
import Typography from '../../components/typography/Typography';
import Chip from '../../components/chip/Chip';
import Button from '../../components/button/Button';
import Slide from '../../components/slide/Slide';
import CarouselImageSelection from '../carouselImageSelection/CarouselImageSelection';
import backgroundImage from '../../assets/iconSvg/bg-hexagon.svg';
import IProject from '../../interface/IProject';
import ButtonGroup from '../../components/button/ButtonGroup';

interface Props {
  data?: IProject;
  title?: string;
}

const PreviewProjectPanel: React.FC<Props> = (props) => {
  const {
    data,
    title = '',
  } = props;

  return (
    <Box 
      className='
        my-8
        relative 
        h-[550px] 
        bg-primary-60 
        overflow-hidden 
        border
        rounded-3xl
        shadow-md 
        shadow-primary-300
      '
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundBlendMode: 'lighten',
      }}
    >

      {/* <Box className='absolute z-10 w-8/12 h-[400px] blur-lg inset-0 bg-gradient-to-t from-primary-400 via-transparent to-transparent opacity-25'/> */}

      <Box className='absolute w-full rounded-3xl h-full border-primary-950 border-t-2'>
        <Box className='flex justify-center w-full'>
          <Box className='flex justify-center items-center bg-primary-950 w-48 h-14 rounded-b-3xl'>
            <Typography className='text-primary-50 underline'>{title}</Typography>
          </Box>
        </Box>
      </Box>

      <Box className='grid grid-cols-2 h-full w-full pt-'>
        <Box className='flex flex-col p-10 gap-5'>
          <Box className='flex w-full flex-col gap-5'>
            <Box className='max-w-4 max-h-full relative'>
              <Typography variant='title'>
                {data?.title ?? 'Title'}
              </Typography>
            </Box>
            <Box className='max-w-full h-20 overflow-hidden relative'>
              <Typography variant='body1' className='text-ellipsis'>
                { data?.description ?? ''}
              </Typography>
            </Box>
          </Box>

          {/* <Box className='absolute flex items-center gap-2 bottom-0 left-0 w-[300px]'>
              <Slide
                className='w-full'
                label={'Slide to Visit'}
                labelSlided={'Visited!'}
                onSlided={() => alert('das')}
              />
            </Box> */}
            
          <hr className='mr-24 border-primary-300'/>

          <Box className='flex w-full h-full relative'>
            <Box className='grid grid-cols-3 gap-x-2 gap-y-2 w-full border border-primary-400 rounded-br-[35px] p-2 rounded-s-lg'>
              <Chip/>
              <Chip/>
              <Chip/>
              <Chip/>
              <Button className='w-10'>More</Button>
            </Box>

          </Box>

          <Box className='flex w-full h-full relative'>
            <ButtonGroup
              label={'Tags:'}
            >
            {
                ([...Array(10)]).map((data, idx) => (
                  <Button
                    key={`button-group-tech-stack-${idx}`}
                    onClick={() => console.log('test')}
                    startComponent={<svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                      </svg>
                    }
                  >
                    Laravel
                  </Button>
                ))
              }
            </ButtonGroup> 
          </Box>  

        </Box>
        <Box className='mt-4'>
          <CarouselImageSelection
            imageSets={data?.imageSets ?? []}
          />
        </Box>
          {/* <Box className='flex w-full h-full relative'>
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
          </Box> */}
      </Box>

      {/* <Box>
        <CarouselImageSelection/>
      </Box> */}

    </Box>
  );
}

export default PreviewProjectPanel;
