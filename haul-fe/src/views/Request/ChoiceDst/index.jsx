import { isPhoneNumber } from "../../../utils/helper.js";
import ToastMaker from "../../../components/Toast/ToastMaker.jsx";
import { UrlMap, ErrorMessageMap } from "../../../data/GlobalVariable.js";

//이 페이지에서 원하는 값이 다 있는지 체크
export function CheckSubmitDisabledFun({
  mapInfo,
  inDstDetailAddress,
  inDstTel
}) {
  const isMapInfoFilled =
    mapInfo.coordinate.latitude !== "" &&
    mapInfo.coordinate.longitude !== "" &&
    mapInfo.detailAddress !== "";
  const isDstDetailAddressFilled = inDstDetailAddress.current.trim() !== "";
  const isDstTelFilled = inDstTel.current.trim() !== "";
  return !(isMapInfoFilled && isDstDetailAddressFilled && isDstTelFilled);
}

export function SumbitStore({
  inDstTel,
  inDstDetailAddress,
  mapInfo,
  setDstInfo,
  navigation
}) {
  if (!isPhoneNumber(inDstTel.current)) {
    ToastMaker({ type: "error", children: ErrorMessageMap.InvalidTelformat });
    return;
  }
  setDstInfo({
    dstName: mapInfo.name,
    dstAddress: mapInfo.detailAddress,
    dstLatitude: Number(mapInfo.coordinate.latitude),
    dstLongitude: Number(mapInfo.coordinate.longitude),
    dstDetailAddress: inDstDetailAddress.current,
    dstTel: inDstTel.current
  });
  navigation(UrlMap.choiceLoadInfoPageUrl);
}
