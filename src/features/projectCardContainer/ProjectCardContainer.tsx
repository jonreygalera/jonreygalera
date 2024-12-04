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
import { StarIcon as StarIconOutline, BookOpenIcon as BookOpenIconOutline, ArrowUpRightIcon} from '@heroicons/react/24/outline';

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
              <Button startComponent={<ArrowUpRightIcon className='size-3 mx-1 items-center'/>} onClick={() => console.log('test')}>Visit</Button>
              <Button startComponent={<StarIconOutline className='size-3 mx-1 items-center'/>} onClick={() => console.log('test')}>Bookmark</Button>
              <Button startComponent={<BookOpenIconOutline className='size-3 mx-1 items-center'/>} onClick={() => onClickView?.()}>Open</Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProjectCardContainer;
