import React from 'react';
import Box from '../../components/box/Box';
import PhotoCardGroup from '../../components/photoCard/PhotoCardGroup';
import PhotoCard from '../../components/photoCard/PhotoCard';
import Typography from '../../components/typography/Typography';
import Button from '../../components/button/Button';
import ButtonGroup from '../../components/button/ButtonGroup';
import backgroundImage from '../../assets/iconSvg/bg-hexagon.svg';
import { tailwindUtil } from '../../utils/tailwindUtil';
import IImageSet from '../../interface/IImageSet';

interface Props {
  data?: Record<string, any>,
  imageSets?: string[],
  active?: boolean,
  onClickView?: () => void
}

const ProjectCardContainer: React.FC<Props> = (props) => {
  const { 
    data,
    active = false,
    onClickView
  } = props;

  return (
    <Box className={tailwindUtil(
      "border-2 flex flex-col max-w-xl mt-10 ml-10 w-[520px] h-[170px] relative rounded-3xl py-2 pr-5 hover:-translate-y-2 transition duration-500 gap-5 hover:bg-primary-75 bg-primary-50 bg-blend-lighten hover:border-primary-400",
      active && "border-primary-400 bg-primary-400",
    )}
      style={{
        backgroundImage: active ? `url(${backgroundImage})` : '',
      }}
    >
      <PhotoCardGroup
        className='
        absolute
        -top-5
        -left-10
        '
      >
        {
          data?.imageSets?.map((data: IImageSet, idx: number) => (
            (idx > 2) ? null : (
              <PhotoCard 
                key={`project-photo${idx}`} 
                src={data?.source ?? ''}
              />
              )
          ))
        }
      </PhotoCardGroup>
      <Box className='flex'>
        <Box
          className="
            ml-48
            flex 
            flex-col 
            w-full
            gap-5
            
          "
        >
          <Box className="flex ">
            <Typography variant='h2'>{data?.title ?? ''}</Typography>
          </Box>
          <Box className="flex gap-1">
            <ButtonGroup>
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
      </Box>
      <Box className="flex justify-end">
        <Button
          className="border border-primary-950 font-bold rounded-lg py-1 w-64 bg-primary-50"
          onClick={() => onClickView?.()}
        >
          View
        </Button>
      </Box>
      {/* <Button className="absolute w-2 rounded-e-xl -right-0 top-16 flex flex-row-reverse pl-2 pr-3 text-primary-50 bg-primary-950"></Button> */}
    </Box>
  );
}

export default ProjectCardContainer;
