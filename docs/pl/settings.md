# Ustawienia

| Ustawienie | Opis |
| --- | --- |
| **Kafelki** | Kafelki w rzędzie. Można je edytować w oknie **Edytuj kafelki**, które otwiera się w oknie dialogowym konfiguracji. Domyślnie nie ma żadnej kafelki. |
| **Pokaż strzałkę** | Wyświetla strzałkę w prawym górnym rogu każdej kafelki z linkiem. Domyślnie włączone. W oknie po prawej stronie w sekcji **Układ**. |

Strzałka jest włączana zbiorczo dla wszystkich kafelek, a nie osobno dla każdego:
rząd, w którym raz pojawia się strzałka, a raz nie, wygląda jak błąd. Na
kafelkach bez celu zasadniczo się nie pojawia — nie ma tam nic,
co można by kliknąć.

## Okno „Edytuj kafelki”

Okno zajmuje cały ekran. U góry znajdują się przyciski **Zastosuj**,
**Anuluj**, **Cofnij**, **Powtórz**, pomoc oraz przełącznik do
podglądu (edytor, pulpit, tablet, urządzenie mobilne). Poniżej znajdują się trzy kolumny:

| Obszar | Znaczenie |
| --- | --- |
| **Kafelki** (po lewej) | Wszystkie kafelki w kolejności, z miniaturą, tytułem i linkiem. Przeciągając uchwyt lub używając klawiatury, można je ponownie uporządkować; opcja **Nowy kafelek** dodaje go na końcu. |
| **Kafelek x z y** (środek) | Pola wybranej kafelki: **Treść** (tytuł, link), **Obraz** (biblioteka multimediów, adres, usuń) oraz **Więcej** (etykieta, opis, tekst alternatywny, nowa karta). Powyżej znajdują się opcje przesuwania, powielania i usuwania kafelków. |
| **Układ** (po prawej) | Przycisk **Pokaż strzałkę**; dotyczy wszystkich kafelków. |

**Zastosuj** zapisuje kafelki i strzałkę w widżecie, **Anuluj** odrzuca
je — w przypadku niezapisanych zmian pojawia się wcześniej pytanie. Status u góry wskazuje,
co uległo zmianie, na przykład „Zmieniono 1 kafelek”.

Kafelek bez tytułu zawiera w polu **Tytuł** informację „Bez tytułu kafelek
nie zostanie wyświetlony” i na liście nosi nazwę „Bez tytułu”. Pozostaje tam
i nie zostaje utracony podczas zapisywania; na stronie pojawi się dopiero,
gdy otrzyma tytuł.

## Pola kafelka

Kafelki i strzałka są przechowywane wspólnie w atrybucie `portfolio-config`
(`{"tiles":[…],"showChevron":true}`, zakodowane). Starsze widżety przechowują kafelki
nadal jako listę JSON w polu `tiles`, a strzałkę w `show-chevron`; oba
są nadal odczytywane, dopóki `portfolio-config` nie ustawi odpowiedniej wartości.
Format kafelków jest w obu przypadkach taki sam:

| Pole | Okno | Obowiązkowe | Znaczenie |
| --- | --- | --- | --- |
| `title` | Tytuł | tak | Nagłówek kafelka. Jeśli go brakuje, kafelek jest pomijany. |
| `description` | Opis (pod „Więcej”) | nie | Krótki tekst pod tytułem. |
| `badge` | Etykieta (pod „Więcej”) | nie | Mała etykieta kategorii nad tytułem. |
| `image` | Obraz | nie | Adres obrazu. Jeśli go brakuje, kafelek nie ma obszaru obrazu. |
| `imageAlt` | Tekst alternatywny (w sekcji „Więcej”) | nie | Tekst alternatywny dla czytników ekranu. Pozostaw puste, jeśli obraz pełni wyłącznie funkcję dekoracyjną. |
| `link` | Link | nie | Adres docelowy kafelka. Bez adresu docelowego kafelek nie jest klikalny i nie wyświetla się strzałka. |
| `newTab` | Otwórz w nowej karcie (w sekcji „Więcej”) | nie | Wartość `true` otwiera adres docelowy w nowej karcie. Domyślnie `false`. |
| `id` | — | nie | Unikalny identyfikator kafelka. Jeśli nie zostanie podany, zostanie przypisany automatycznie. |

Obrazy są przycinane do proporcji 16:9 i całkowicie wypełniają kafelek.
Prosimy o dostarczenie motywów, w przypadku których przycięcie na krawędziach
nie stanowi problemu.
