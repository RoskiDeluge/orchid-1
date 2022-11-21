import React from 'react'
import Image from 'next/image'
import sd from '../public/img/sd1.png'
import de from '../public/img/de1.png'

export default function Home() {
  return (
    <>
        <Image 
            src={sd} 
            alt="Picture of an orchid generated by Stable Diffusion" 
        />
        <p>Stable Diffusion</p>
        <Image 
            src={de} 
            alt="Picture of an orchid generated by Dalle2" 
        />
        <p>Dalle2</p>
        <p>Prompt: A mixed media image of an orchid with a human face in the style of Salvador Dali and Yayoi Kusama.</p> 
    </>
  )
}