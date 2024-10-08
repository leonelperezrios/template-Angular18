import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Directive({
  selector: '[appSvgThemeColor]',
  standalone: true
})
export class SvgThemeColorDirective  implements  OnInit{

    @Input() appSvgColor: string;
    @Input() svgPath: string;
    @Input() svgElementSelector: string;
    @Input() svgWidth: string = '250px';

    constructor(private el: ElementRef, private http: HttpClient) {}

    ngOnInit() {
        this.loadSvg();
    }

    /**
     * Este código define un método privado llamado `loadSvg()` que carga un archivo SVG utilizando una solicitud HTTP GET.
     * La ruta del archivo SVG se especifica en la variable `svgPath`.
     * El método luego analiza el archivo SVG utilizando la API DOMParser y establece el atributo `fill` de todos los elementos `path` en el SVG con el valor de la variable `appSvgColor`.
     * Si se especifica un `svgElementSelector`, el método solo establece el atributo `fill` de los elementos que coinciden con el selector.
     * El método también establece el atributo `width` del SVG con el valor de la variable `svgWidth` y establece el atributo `height` en `auto`.
     * Finalmente, el método reemplaza el contenido del elemento al que se aplica la directiva con el documento SVG analizado.
     * @private
     */
    private loadSvg() {
        this.http.get(this.svgPath, { responseType: 'text' }).subscribe(svg => {
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svg, 'image/svg+xml').documentElement;

            if (this.svgElementSelector) {
                const targetElements = svgDoc.querySelectorAll(this.svgElementSelector);
                if (targetElements) {
                    for (let i = 0; i < targetElements.length; i++) {
                        targetElements[i].setAttribute('fill', this.appSvgColor);
                    }
                }
            } else {
                // Si no hay selector, cambiar todos los paths
                svgDoc.querySelectorAll('path').forEach(path => {
                    path.setAttribute('fill', this.appSvgColor);
                });
            }

            svgDoc.setAttribute('width', this.svgWidth);
            svgDoc.setAttribute('height', 'auto');

            this.el.nativeElement.innerHTML = '';
            this.el.nativeElement.appendChild(svgDoc);
        });
    }

}
