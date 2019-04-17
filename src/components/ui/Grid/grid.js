export default function Grid(name) {
  return {
    name: `app-${name}`,
    functional: true,
    props: {
      tag: {
        type: String,
        default: 'div',
      },
    },
    render: (h, { props, data, children }) => {
      data.staticClass = (`${name} ${data.staticClass || ''}`).trim();

      if (data.attrs) {
        const classes = Object.keys(data.attrs).filter(key => {
          if (key === 'slot') return false;

          const value = data.attrs[key];

          return value || typeof value === 'string';
        });

        if (classes.length) data.staticClass += ` ${classes.join(' ')}`;
        delete data.attrs;
      }

      return h(props.tag, data, children);
    },
  };
}
