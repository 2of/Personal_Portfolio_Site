import React from 'react';
import styles from './StandardGrid.module.scss';

const VARIANT_SPANS = {
  hero:    { col: 2, row: 2 },
  large:   { col: 2, row: 1 },
  wide:    { col: 2, row: 1 },
  tall:    { col: 1, row: 2 },
  square:  { col: 1, row: 1 },
  regular: { col: 1, row: 1 }
};

const StandardGrid = ({
  children,
  columns = 'auto',
  gap = 'md',
  dense = false,
  free = false,
  animated = false,
  staggerDelay = 60,
  reflow = false,
  rowHeightVariant = '', // NEW: 'regular', 'proj', or ''
  className = '',
  style = {},
  ...props
}) => {
  const containerClasses = [
styles.standardGrid,
    styles[`cols-${columns}`],
    styles[`gap-${gap}`],
    dense ? styles.dense : '',
    free ? styles.free : '',
    reflow ? styles.reflow : '',
    rowHeightVariant === 'regular' ? styles['fixed-regular'] : '',
    rowHeightVariant === 'proj' ? styles['fixed-proj'] : '',
    className
  ].filter(Boolean).join(' ');

  const renderedChildren = animated
    ? React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child, {
          className: `${child.props.className || ''} ${styles.animated}`.trim(),
          style: {
            ...child.props.style,
            animationDelay: `${index * staggerDelay}ms`
          }
        });
      })
    : children;

  return (
    <div className={containerClasses} style={style} {...props}>
      {renderedChildren}
    </div>
  );
};

StandardGrid.Item = ({
  children,
  variant = 'regular',
  colSpan,
  rowSpan,
  className = '',
  style = {},
  ...props
}) => {
  const variantSpan = VARIANT_SPANS[variant] || VARIANT_SPANS.regular;

  const resolvedColSpan = colSpan ?? variantSpan.col;
  const resolvedRowSpan = rowSpan ?? variantSpan.row;

  const itemClasses = [
    styles.gridItem,
    resolvedColSpan === 'full'
      ? styles['col-span-full']
      : resolvedColSpan > 1
        ? styles[`col-span-${resolvedColSpan}`]
        : '',
    resolvedRowSpan === 'full'
      ? styles['row-span-full']
      : resolvedRowSpan > 1
        ? styles[`row-span-${resolvedRowSpan}`]
        : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={itemClasses} style={style} {...props}>
      {children}
    </div>
  );
};

export default StandardGrid;
export { StandardGrid };
