import isUrl from 'is-url'

export default function PasteLinkify(options = {}) {
  const {
    isActiveQuery = 'isLinkActive',
    wrapCommand = 'wrapLink',
    unwrapCommand = 'unwrapLink',
    skip = null,
  } = options

  return {
    onCommand(command, editor, next) {
      const { type, args } = command
      const { value } = editor
      const { selection } = value
      const { isCollapsed, start } = selection
      let url

      if (
        (type === 'insertText' && isUrl((url = args[0]))) ||
        (type === 'insertFragment' && isUrl((url = args[0].text)))
      ) {
        if (skip && skip.call(this, command, editor)) {
          return next()
        }

        // If there is already a link active, unwrap it so that we don't end up
        // with a confusing overlapping inline situation.
        if (editor.query(isActiveQuery, value)) {
          editor.command(unwrapCommand)
        }

        // If the selection is collapsed, we need to allow the default inserting
        // to occur instead of just wrapping the existing text in a link.
        if (isCollapsed) {
          next()
          editor
            .moveAnchorTo(start.offset)
            .moveFocusTo(start.offset + url.length)
        }

        // Wrap the selection in a link, and collapse to the end of it.
        editor.command(wrapCommand, url).moveToEnd()
        return
      }

      next()
    },
  }
}
