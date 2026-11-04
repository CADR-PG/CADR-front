import { requestFileDownload } from '@/api/client';
import { normalizeUrl } from '@/engine/components/helpers/material';
import NavMesh from '@/engine/components/NavMesh';
import { ECS } from '@/engine/ECS';
import useEntityManager from '@/hooks/useEntityManager';
import ControllerProps from '@/types/ControllerProps';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as RECAST from 'recast-navigation';
import { NavMeshHelper } from '@recast-navigation/three';

export default function NavMeshController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const navMesh = em.getComponent(NavMesh, entity);
  const nmWrite = ECS.instance.entityManager.getComponent(NavMesh, entity);
  const { uuid } = useParams();
  const { scene } = useThree();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function load() {
      if (!navMesh || !nmWrite || navMesh.source === '') return;

      const data = await requestFileDownload(uuid!, navMesh.source, { signal });
      if (signal.aborted) return;

      const map = await fetch(normalizeUrl(data));
      const blob = await map.blob();
      const array = new Uint8Array(await blob.arrayBuffer());
      console.log('Here', array);
      const { navMesh: mesh } = RECAST.importNavMesh(array);

      nmWrite.mesh = mesh;
      const navMeshHelper = new NavMeshHelper(mesh);
      scene.add(navMeshHelper);
      //
      // const navMeshQuery = new RECAST.NavMeshQuery(mesh);
      // const start = { x: 0, y: 0, z: 0 };
      // const end = { x: -5, y: 0, z: 0 };
      // const { success, error, path } = navMeshQuery.computePath(start, end);
      // console.log('Computed path', success, error, path);
    }

    load();

    return () => {
      controller.abort();
    };
  }, [uuid, navMesh]);

  return null;
}
