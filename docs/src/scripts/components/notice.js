import shade from '../../../../node_modules/shadejs/src/index';
import skate from '../../../../src/index';

export default skate('skate-notice', {
  template: shade(`
    <content select="p"></content>
  `)
});
