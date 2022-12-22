import React, { FC } from 'react';
import { Colors } from '../models/Colors';
import { Figure } from '../models/figures/Figure';

interface LostFiguresProps {
  title: string;
  figures: Figure[];
}

const LostFigures: FC<LostFiguresProps> = ({ title, figures }) => {
  return (
    <div className='lost'>
      <h3 style={{ marginBottom: '10px' }}>{title === Colors.WHITE ? 'Blanco:' : 'Negro:'}</h3>
      {figures.map(figure =>
        <div key={figure.id} style={{ textAlign: 'center' }}>
          {figure.logo && <img width={20} height={20} src={figure.logo} />}
        </div>
      )}
    </div>
  );
}

export default LostFigures;

