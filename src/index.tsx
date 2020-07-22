import React, { useEffect, useRef, useImperativeHandle, useCallback } from 'react';
import type { PannellumConfig, PannellumViewer } from './interface';
import 'pannellum/src/js/libpannellum';
import 'pannellum/src/js/pannellum';
import 'pannellum/src/css/pannellum.css';

export interface PannellumProps extends PannellumConfig {
  style?: React.CSSProperties;
  className?: string;
  clickInfo?: boolean;
}

export interface PannellumRef {
  getViewer: () => PannellumViewer;
}

const Pannellum: React.ForwardRefRenderFunction<PannellumRef, PannellumProps> = (
  { style, className, ...restProps },
  ref
) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pannellumRef = useRef<PannellumViewer | null>(null);

  const consoleClickInfo = useCallback((e: MouseEvent) => {
    if (!pannellumRef.current) {
      console.warn('viewer not exist');
      return;
    }
    const [pitch, yaw] = pannellumRef.current?.mouseEventToCoords(e);
    console.log('click info', { pitch, yaw });
  }, []);

  useEffect(() => {
    const { clickInfo, ...params } = restProps;
    pannellumRef.current = window.pannellum.viewer(containerRef.current!, {
      ...params,
    });

    if (clickInfo) pannellumRef.current?.on('mousedown', consoleClickInfo);

    return () => {
      try {
        pannellumRef.current?.off('mousedown', consoleClickInfo);
      } catch {}
      pannellumRef.current?.destroy();
    };
  }, [restProps]);

  useImperativeHandle(ref, () => ({
    getViewer: () => pannellumRef.current!,
  }));

  return <div className={className} style={style} ref={containerRef} />;
};

export default React.forwardRef(Pannellum);
