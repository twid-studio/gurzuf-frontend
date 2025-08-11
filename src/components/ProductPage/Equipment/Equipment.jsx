"use client";
import { DataContext } from '@/lib/providers/DataProvider/context';
import React, { useContext } from 'react'

import './Equipment.scss';
import Image from 'next/image';

export default function Equipment() {
  const { data: allData } = useContext(DataContext);
  const { equipment: data } = allData;

  return (
    <section className="equipment container">
      <div className="equipment__title-wrapper">
        <h1>{data?.title}</h1>
        <p dangerouslySetInnerHTML={{ __html: data?.text }} />
      </div>

      <div className="list">
        {data?.list.map((item, index) => (
          <div className="list__item" key={index}>
            <Image src={item.image} width={316} height={263} alt={item.title} className="list__item-image" />
            <p className="list__item-title">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
