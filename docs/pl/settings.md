# Ustawienia

| Ustawienie | Opis |
| --- | --- |
| **Kafelki** | Kafelki w postaci listy JSON. Domyślną wartością jest `[]`, czyli brak kafelków. Pola dla poszczególnych kafelków znajdują się poniżej. |
| **Pokaż strzałkę** | Wyświetla strzałkę w prawym górnym rogu każdej kafelki z linkiem. Domyślnie włączone. |

Strzałka jest włączana zbiorczo dla wszystkich kafelek, a nie indywidualnie dla każdego:
rząd, w którym raz pojawia się strzałka, a raz nie, wygląda jak błąd. Na
kafelkach bez celu zasadniczo się nie pojawia — nie ma tam nic,
co można by kliknąć.

## Pola kafelka

| Pole | Obowiązkowe | Znaczenie |
| --- | --- | --- |
| `title` | tak | Nagłówek kafelka. Jeśli go brakuje, kafelek jest pomijany. |
| `description` | nie | Krótki tekst pod tytułem. |
| `badge` | nie | Mała etykieta kategorii nad tytułem. |
| `image` | nie | Adres obrazu. Jeśli go brakuje, kafelek nie ma obszaru obrazu. |
| `imageAlt` | nie | Tekst alternatywny dla czytników ekranu. Pozostaw puste, jeśli obraz ma charakter wyłącznie dekoracyjny. |
| `link` | nie | Adres docelowy kafelka. Bez adresu docelowego kafelek nie jest klikalny i nie wyświetla się na nim strzałka. |
| `newTab` | nie | Wartość `true` otwiera stronę docelową w nowej karcie. Domyślnie `false`. |
| `id` | nie | Unikalny identyfikator kafelka. Jeśli nie zostanie podany, zostanie przypisany automatycznie. |

Obrazy są przycinane do proporcji 16:9 i całkowicie wypełniają kafelek.
Prosimy o dostarczenie motywów, w przypadku których przycięcie na krawędziach
nie stanowi problemu.
