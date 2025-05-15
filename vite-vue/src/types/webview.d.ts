/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

interface HTMLWebviewElement extends HTMLElement {
    src: string;
    insertCSS(css: string): void;
    addEventListener(type: string, listener: EventListener): void;
}

declare global {
    interface HTMLElementTagNameMap {
        'webview': HTMLWebviewElement;
    }
} 