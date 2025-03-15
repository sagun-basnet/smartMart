import React from 'react'
import Card from '../Card';

const Electronics = () => {
    return (
        <div className="flex flex-col">
          <h1 className="text-6xl text-center font-bold">Electronics</h1>
          <div className="grid grid-cols-3 overflow-y-scroll h-[calc(100vh-9rem)] gap-6 p-4">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      );
}

export default Electronics