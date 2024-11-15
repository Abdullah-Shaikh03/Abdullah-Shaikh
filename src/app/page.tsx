"use client";
import React from 'react'
import { HeroParallax } from '@/components/ui/hero-parallax';
import { StackIcon } from '@radix-ui/react-icons';
import Scroller from '@/components/InfiniteScroller/Scroller';
const page = () => {
  const links =[
    {
      title: 'MusicAI',
      link: 'https://github.com/AbdullahSK03/Mini-Project',
      thumbnail:'/image.png'
    },
    {
      title: "Mothers Doon kitchen" ,
      link: 'https://www.MothersDoonKitchen.com',
      thumbnail:'/image2.png'
    },
    {
      title: 'OA Footwears (Under Development)',
      link: 'https://oafootwears.vercel.app/',
      thumbnail:'/image3.png'
    },
    {
      title: 'MusicAI',
      link: 'https://github.com/AbdullahSK03/Mini-Project',
      thumbnail:'/image4.png'
    },
    {
      title: 'MusicAI',
      link: 'https://github.com/AbdullahSK03/Mini-Project',
      thumbnail:'/image.png'
    },
    {
      title: "Mothers Doon kitchen" ,
      link: 'https://www.MothersDoonKitchen.com',
      thumbnail:'/image2.png'
    },
    {
      title: 'OA Footwears (Under Development)',
      link: 'https://oafootwears.vercel.app/',
      thumbnail:'/image3.png'
    },
    {
      title: 'MusicAI',
      link: 'https://github.com/AbdullahSK03/Mini-Project',
      thumbnail:'/image4.png'
    },
    {
      title: 'MusicAI',
      link: 'https://github.com/AbdullahSK03/Mini-Project',
      thumbnail:'/image.png'
    },
    {
      title: "Mothers Doon kitchen" ,
      link: 'https://www.MothersDoonKitchen.com',
      thumbnail:'/image2.png'
    },
    {
      title: 'OA Footwears (Under Development)',
      link: 'https://oafootwears.vercel.app/',
      thumbnail:'/image3.png'
    },
    {
      title: 'MusicAI',
      link: 'https://github.com/AbdullahSK03/Mini-Project',
      thumbnail:'/image4.png'
    },
    {
      title: 'MusicAI',
      link: 'https://github.com/AbdullahSK03/Mini-Project',
      thumbnail:'/image.png'
    },
    {
      title: "Mothers Doon kitchen" ,
      link: 'https://www.MothersDoonKitchen.com',
      thumbnail:'/image2.png'
    },
    {
      title: 'OA Footwears (Under Development)',
      link: 'https://oafootwears.vercel.app/',
      thumbnail:'/image3.png'
    },
    {
      title: 'MusicAI',
      link: 'https://github.com/AbdullahSK03/Mini-Project',
      thumbnail:'/image4.png'
    },
  ]
  return (
    <div>
      <HeroParallax products={links}/>
      <Scroller />
    </div>
  )
}

export default page