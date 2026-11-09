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
import { useEditorContext } from '@/hooks/useEditorContext';

export default function NavMeshController({ entity }: ControllerProps) {
  const em = useEntityManager();
  const navMesh = em.getComponent(NavMesh, entity);
  const nmWrite = ECS.instance.entityManager.getComponent(NavMesh, entity);
  const { uuid } = useParams();
  const { scene } = useThree();
  const { running } = useEditorContext();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    let navMeshHelper: NavMeshHelper;
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
      navMeshHelper = new NavMeshHelper(mesh);
      if (!running) scene.add(navMeshHelper);
    }

    load();

    return () => {
      controller.abort();
      if (navMeshHelper) {
        scene.remove(navMeshHelper);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuid, navMesh, running]);

  return null;
}
