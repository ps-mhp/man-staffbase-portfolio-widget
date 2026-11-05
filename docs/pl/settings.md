# Ustawienia

| Ustawienie | Opis |
| --- | --- |
| **Kafelki** | Kafelki w rzędzie. Można je edytować w edytorze kafelków, który otwiera się po kliknięciu opcji **Edytuj kafelki**. Domyślnie nie ma żadnego kafelka. |
| **Pokaż strzałkę** | Wyświetla strzałkę w prawym górnym rogu każdej płytki z linkiem. Domyślnie włączone. |

Strzałka jest włączana zbiorczo dla wszystkich kafelek, a nie indywidualnie dla każdego:
rząd, w którym raz pojawia się strzałka, a raz nie, wygląda jak błąd. Na
kafelkach bez celu zasadniczo się nie pojawia — nie ma tam nic,
co można by kliknąć.

## Edytor kafelków

Edytor wyświetla po jednym wierszu na każdy kafelek, wszystkie pod sobą. W wierszu
znajdują się:

| Element | Znaczenie |
| --- | --- |
| **Uchwyt** (po lewej) | Przesuwa kafelek w inne miejsce. Za pomocą klawiatury można go przesuwać za pomocą **strzałki w górę** i **strzałki w dół** o jedno miejsce. |
| **Obraz** | Podgląd. Ikona ołówka otwiera bibliotekę multimediów, a ikona kosza na podglądzie usuwa tylko obraz, a nie sam kafelek. Jeśli nie ma obrazu, w tym miejscu pojawia się przerywana ramka **Wybierz obraz**. |
| **Tytuł** | Nagłówek kafelka. Pole obowiązkowe. |
| **Link** | Miejsce docelowe kafelka. |
| **Więcej** / **Mniej** | Rozwija rzadziej używane pola: etykieta, opis, tekst alternatywny obrazu oraz **Otwórz w nowej karcie**. |
| **Kosz** (po prawej) | Usuwa całą kafelkę. |

Pod listą znajduje się przycisk **Dodaj kafelek**; nowy kafelek zostanie dodany na
końcu. Przycisk **Zastosuj** zapisuje listę w widżecie, a przycisk **Anuluj** odrzuca
ją — w przypadku niezapisanych zmian pojawi się wcześniej pytanie.

Kafelek bez tytułu ma w edytorze informację „Bez tytułu ten
kafelek nie będzie wyświetlany”. Pozostaje on na liście i nie zostanie
utracony podczas zapisywania; na stronie pojawi się dopiero wtedy, gdy będzie miał tytuł.

## Pola kafelka

Kafelki są zapisywane jako lista JSON. Jest to widoczne tylko wtedy, gdy
edytor nie wyświetla się — w takim przypadku jako rozwiązanie awaryjne pozostaje pole tekstowe.

| Pole | Edytor | Obowiązkowe | Znaczenie |
| --- | --- | --- | --- |
| `title` | Tytuł | tak | Nagłówek kafelka. Jeśli go brakuje, kafelek jest pomijany. |
| `description` | Opis (w sekcji „Więcej”) | nie | Krótki tekst pod tytułem. |
| `badge` | Etykieta (w sekcji „Więcej”) | nie | Mała etykieta kategorii nad tytułem. |
| `image` | Obraz | nie | Adres obrazu. Jeśli go brakuje, kafelek nie ma obszaru obrazu. |
| `imageAlt` | Tekst alternatywny (w sekcji „Więcej”) | nie | Tekst alternatywny dla czytników ekranu. Pozostaw puste, jeśli obraz pełni wyłącznie funkcję dekoracyjną. |
| `link` | Link | nie | Adres docelowy kafelka. Bez adresu docelowego kafelek nie jest klikalny i nie wyświetla się strzałka. |
| `newTab` | Otwórz w nowej karcie (w sekcji „Więcej”) | nie | Wartość `true` otwiera adres docelowy w nowej karcie. Domyślnie `false`. |
| `id` | — | nie | Unikalny identyfikator kafelka. Jeśli nie zostanie podany, zostanie przypisany automatycznie. |

Obrazy są przycinane do proporcji 16:9 i całkowicie wypełniają kafelek.
Prosimy o dostarczenie motywów, w przypadku których przycięcie na krawędziach
nie stanowi problemu.
