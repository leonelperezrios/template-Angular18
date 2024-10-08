import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {LayoutService, ThemeService} from "./layout/service";
import {StorageService} from "@services";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    typeConfigList: string[] = ['menuMode', 'scale', 'ripple', 'inputStyle'];

    constructor(
        private primengConfig: PrimeNGConfig,
        public layoutService: LayoutService,
        private storageService: StorageService,
        private themeService: ThemeService,
    ) {
        this.themeService.getThemeLocalStorage();
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.initConfig();
    }

    get scale(): number {
        return this.layoutService.config().scale;
    }

    initConfig(): void {
        this.typeConfigList.forEach(item => {
            this.getConfigLocalStorage(item);
        })
    }

    getConfigLocalStorage(config: string) {
        let configOption = this.storageService.getLocalStorage(config);
        if (configOption) {
            this.layoutService.config[config] = configOption;
        }
        if (config === 'scale') {
            this.applyScale();
        }
    }

    applyScale() {
        document.documentElement.style.fontSize = this.scale + 'px';
    }
}
