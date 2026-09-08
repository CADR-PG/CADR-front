import useDownloadFile from './useDownloadFile';

export default function useDownloadTextures(params: any | undefined) {
  const { data: alphaMap } = useDownloadFile(params?.alphaMap);
  const { data: aoMap } = useDownloadFile(params?.aoMap);
  const { data: envMap } = useDownloadFile(params?.envMap);
  const { data: lightMap } = useDownloadFile(params?.lightMap);
  const { data: specularMap } = useDownloadFile(params?.specularMap);
  const { data: map } = useDownloadFile(params?.map);
  const { data: displacementMap } = useDownloadFile(params?.displacementMap);
  const { data: bumpMap } = useDownloadFile(params?.bumpMap);
  const { data: metalnessMap } = useDownloadFile(params?.metalnessMap);
  const { data: normalMap } = useDownloadFile(params?.normalMap);
  const { data: emissiveMap } = useDownloadFile(params?.emissiveMap);
  const { data: roughnessMap } = useDownloadFile(params?.roughnessMap);
  const { data: gradientMap } = useDownloadFile(params?.gradientMap);

  const { data: anisotropyMap } = useDownloadFile(params?.anisotropyMap);
  const { data: clearcoatMap } = useDownloadFile(params?.clearcoatMap);
  const { data: clearcoatRoughnessMap } = useDownloadFile(
    params?.clearcoatRoughnessMap,
  );
  const { data: iridescenceMap } = useDownloadFile(params?.iridescenceMap);
  const { data: iridescenceThicknessMap } = useDownloadFile(
    params?.iridescenceThicknessMap,
  );
  const { data: sheenColorMap } = useDownloadFile(params?.sheenColorMap);
  const { data: sheenRoughnessMap } = useDownloadFile(
    params?.sheenRoughnessMap,
  );
  const { data: specularColorMap } = useDownloadFile(params?.specularColorMap);
  const { data: thicknessMap } = useDownloadFile(params?.thicknessMap);
  const { data: transmissionMap } = useDownloadFile(params?.transmissionMap);

  return {
    alphaMap,
    aoMap,
    envMap,
    lightMap,
    specularMap,
    map,
    displacementMap,
    bumpMap,
    metalnessMap,
    normalMap,
    emissiveMap,
    roughnessMap,
    gradientMap,
    anisotropyMap,
    clearcoatMap,
    clearcoatRoughnessMap,
    iridescenceMap,
    iridescenceThicknessMap,
    sheenColorMap,
    sheenRoughnessMap,
    specularColorMap,
    thicknessMap,
    transmissionMap,
  };
}
