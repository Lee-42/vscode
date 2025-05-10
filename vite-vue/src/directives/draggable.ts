/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import type { Directive } from 'vue';

// 扩展 CSSStyleDeclaration 类型
declare module 'vue' {
  interface CSSStyleDeclaration {
    webkitAppRegion: string;
  }
}

export const draggable: Directive = {
  mounted(el: HTMLElement) {
    (el.style as any).webkitAppRegion = 'drag';
    // 对于按钮等需要点击的元素，我们需要设置 webkitAppRegion 为 no-drag
    const noDragElements = el.querySelectorAll('button, input, a, [role="button"]');
    noDragElements.forEach((element) => {
      if (element instanceof HTMLElement) {
        (element.style as any).webkitAppRegion = 'no-drag';
      }
    });
  }
};