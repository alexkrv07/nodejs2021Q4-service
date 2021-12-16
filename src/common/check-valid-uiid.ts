import { PatternUUID } from './constants';

function checkvalidityUIID(uiid: string): boolean {
  return PatternUUID.test(uiid);
}

export { checkvalidityUIID } ;