'use strict';

const PUT_POSITION = 'PUT_POSITION',
      DEL_POSITION = 'DEL_POSITION';

export const types = { PUT_POSITION, DEL_POSITION };

export function putPosition(id, yCoord) {
  return { type: PUT_POSITION, id, yCoord };
}

export function deletePosition(id) {
  return { type: DEL_POSITION, id };
}
