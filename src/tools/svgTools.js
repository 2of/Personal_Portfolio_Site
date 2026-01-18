    export function extractSvgTextMapEntry(
  componentSource,
  keyName = 'Unsure_hello'
) {
  const getAttr = (name) => {
    const match = componentSource.match(
      new RegExp(`${name}="([^"]+)"`)
    );
    return match?.[1] ?? '';
  };

  const viewBox = getAttr('viewBox');
  const dataAsc = getAttr('data-asc');
  const width = getAttr('width');
  const height = getAttr('height');

  const dMatch = componentSource.match(
    /<path[^>]*d="([^"]+)"/s
  );
  const d = dMatch?.[1] ?? '';

  return `${keyName}: {
  viewBox: "${viewBox}",
  dataAsc: "${dataAsc}",
  width: ${width},
  height: ${height},
  d: \`${d}\`
}`;
}

