import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../models/user';
import {ProfileService} from '../../services/profile.service';
import {InternationalizationService} from '../../services/internationalization.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nt-header',
  templateUrl: './nt-header.component.html',
  styleUrls: ['./nt-header.component.scss']
})
export class NtHeaderComponent implements OnInit {

  isOpen = false;
  user: User = null;
  locale: string;

  selectedNav;
  isNavClicked = false;

  socials = [
    {
      icon: 'images/icons/icon_facebook.svg',
      url: 'https://facebook.com/thesezvous/',
      alt: 'Facebook'
    }, {
      icon: 'images/icons/icon_insta.svg',
      url: 'https://www.instagram.com/thesezvous',
      alt: 'Instagram'
    }, {
      icon: 'images/icons/icon_twitter.svg',
      url: 'https://twitter.com/ThesezVous',
      alt: 'Twitter'
    }, {
      icon: 'images/icons/icon_linkedin.svg',
      url: 'https://www.linkedin.com/company/thesezvous',
      alt: 'LinkedIn'
    }];

  nav = [
    {
      label: 'à propos',
      url: '',
      router_url: '',
      nav: [
        {
          label: 'Mission',
          url: 'http://www.thesez-vous.com/agrave-propos.html',
          router_url: ''
        }, {
          label: 'Historique',
          url: 'http://www.thesez-vous.com/historique.html',
          router_url: ''
        }, {
          label: 'Équipe',
          url: 'http://www.thesez-vous.com/equipe.html',
          router_url: ''
        }, {
          label: 'Revue de presse',
          url: 'http://www.thesez-vous.com/revue-de-presse.html',
          router_url: ''
        }, {
          label: 'Prix et distinctions',
          url: 'http://www.thesez-vous.com/prix-et-distinctions.html',
          router_url: ''
        }, {
          label: 'Besoin d’aide?',
          url: 'http://www.thesez-vous.com/besoin-daide.html',
          router_url: ''
        },
      ]
    }, {
      label: 'Retraites',
      url: '',
      router_url: '',
      nav: [
        {
          label: 'Qu’est-ce?',
          url: 'http://www.thesez-vous.com/questcequuneretraite.html',
          router_url: ''
        }, {
          label: 'Retraites hors ville',
          url: 'http://www.thesez-vous.com/questcequuneretraite.html',
          router_url: ''
        }, {
          label: 'Retraites urbaine',
          url: '',
          router_url: ''
        }, {
          label: 'Retraites sur mesure',
          url: '',
          router_url: ''
        }, {
          label: 'Bourses et financement',
          url: 'http://www.thesez-vous.com/bourses-et-financement.html\n',
          router_url: ''
        }, {
          label: 'Partenariat SBL',
          url: 'http://www.thesez-vous.com/sbl.html',
          router_url: ''
        }, {
          label: 'S’inscrire',
          url: 'http://www.thesez-vous.com/inscription.html',
          router_url: ''
        }
      ]
    }, {
      label: 'Espace',
      url: '',
      router_url: '',
      nav: [
        {
          label: 'Qu’est-ce?',
          url: '',
          router_url: ''
        }, {
          label: 'Fonctionnement',
          url: 'http://www.thesez-vous.com/inscriptionespace.html',
          router_url: ''
        }, {
          label: 'Programmation',
          url: 'http://www.thesez-vous.com/espace.html',
          router_url: ''
        }, {
          label: 'Réserver',
          url: 'https://www.thesez-vous.org/reservation/1',
          router_url: ''
        }
      ]
    }, {
      label: 'Membership',
      url: '',
      router_url: '',
      nav: [
        {
          label: 'Étudiant',
          url: 'http://www.thesez-vous.com/membre-etudiant.html',
          router_url: ''
        }, {
          label: 'Professeur',
          url: 'http://www.thesez-vous.com/membreprof.html',
          router_url: ''
        }, {
          label: 'Allié',
          url: 'http://www.thesez-vous.com/membreallie.html',
          router_url: ''
        }, {
          label: 'Communauté',
          url: 'http://www.thesez-vous.com/communaute.html',
          router_url: ''
        }, {
          label: 'Termes et conditions',
          url: 'http://www.thesez-vous.com/termes-et-conditions.html',
          router_url: ''
        }, {
          label: 'Portraits',
          url: 'http://www.thesez-vous.com/portrait.html',
          router_url: ''
        }, {
          label: 'Devenir membre',
          url: 'https://www.thesez-vous.org/register',
          router_url: ''
        }
      ]
    }, {
      label: 'Ambassadeur.trices',
      url: 'http://www.thesez-vous.com/reseau.html',
      router_url: '',

    }, {
      label: 'Actualité',
      url: 'http://www.thesez-vous.com/blogue.html',
      router_url: '',

    }, {
      label: 'BiblioThèse',
      url: 'http://www.thesez-vous.com/bibliothese.html',
      router_url: '',
    }, {
      label: 'Contact',
      url: 'http://www.thesez-vous.com/contact.html',
      router_url: '',
    }
  ];

  constructor(private authenticationService: AuthenticationService,
              private profileService: ProfileService,
              private internationalizationService: InternationalizationService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.isAuthenticated()) {
      this.profileService.get().subscribe(
        profile => {
          this.authenticationService.setProfile(profile);
          this.user = new User(this.authenticationService.getProfile());
          this.authenticationService.profile.subscribe(
            emitedProfile => this.user = new User(emitedProfile)
          );
        }
      );
    }
    this.getCurrentLanguage();
  }

  toggleHeader() {
    this.isOpen = !this.isOpen;
  }

  closeHeader() {
    this.isOpen = false;
  }

  isAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }

  isAdmin() {
    return this.authenticationService.isAdmin();
  }

  changeLanguage(language: string) {
    this.internationalizationService.setLocale(language);
  }

  getCurrentLanguage() {
    this.locale = InternationalizationService.getLocale();
    this.subscribeToLocaleChange();
  }

  subscribeToLocaleChange() {
    this.internationalizationService.locale.subscribe(
      emitedLocale => {
        this.locale = emitedLocale;
      }
    );
  }

  enterNav(nav) {
    if (!this.isNavClicked) {
      this.selectedNav = nav;
    }
  }

  clearNav() {
    if (!this.isNavClicked) {
      this.selectedNav = null;
    }
  }

  clickNav(nav) {

    if (nav.url) {
        this.router.navigate(nav.url);
    }else {

      if (nav === this.isNavClicked) {
        this.isNavClicked = false;
        this.selectedNav = null;
      } else {
        this.isNavClicked = true;
        this.selectedNav = nav;
      }
    }
  }



}
