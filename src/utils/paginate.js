import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  //My way
  //   return items.slice(
  //     (pageNumber - 1) * pageSize,
  //     (pageNumber - 1) * pageSize + pageSize
  //   );

  //Mosh's way
  const startIdx = (pageNumber - 1) * pageSize;
  return _(items).slice(startIdx).take(pageSize).value();
}
