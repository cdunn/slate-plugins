import factory from './factory'
import slateDropOrPasteImages from '../../packages/@tildepage/slate-drop-or-paste-images/package.json'
import slatePasteLinkify from '../../packages/@tildepage/slate-paste-linkify/package.json'

const configurations = [
  ...factory(slateDropOrPasteImages),
  ...factory(slatePasteLinkify),
]

export default configurations
