# Ustawienia

| Ustawienie | Opis |
| --- | --- |
| **Kafelki** | Kafelki w rzędzie. Można je edytować w oknie **Edytuj kafelki**, które otwiera się w oknie dialogowym konfiguracji. Domyślnie nie ma żadnej kafelki. |
| **Wygląd** | **Kafelka z obrazem** (obraz u góry, przycięty do formatu 16:9, tekst poniżej) lub **Pole z ikoną** (ikona lub obraz dopasowany, tekst wyśrodkowany na kolorowym tle). Domyślnie ustawiona jest kafelka obrazkowa. W oknie po prawej stronie w sekcji **Układ**. |
| **Rozmiar** | **Kompaktowy**, **Normalny** lub **Duży** — dla każdego typu wyświetlania. Domyślnie ustawiony jest rozmiar Normalny. Zobacz poniżej. |
| **Tło** | Tło kafelków: **Standardowe**, jeden z kolorów MAN-CI lub własna wartość szesnastkowa (`#RRGGBB`). Domyślnie białe dla kafelka z obrazkiem i czerwony MAN dla ramki z ikoną. |
| **Czcionka** | Kolor tytułu, etykiety, opisu i strzałki: **Automatycznie**, jeden z kolorów MAN-CI lub własna wartość szesnastkowa. Opcja „Automatycznie” wybiera na wybranym tle bardziej czytelny kolor spośród ciemnego i białego, w pozostałych przypadkach stosowane są standardowe kolory MAN. |
| **Pokaż strzałkę** | Wyświetla strzałkę w prawym górnym rogu każdej kafelki z linkiem. Domyślnie włączone. W oknie po prawej stronie w sekcji **Układ**. |

Wygląd, rozmiar, kolory i strzałka dotyczą wszystkich kafelek łącznie, a nie
każdego osobno: rząd, w którym każdy kafelek wygląda inaczej, sprawia wrażenie
błędu. Na kafelkach bez celu strzałka zasadniczo się nie pojawia — tam
nie ma czego kliknąć.

## Rozmiary

Rozmiar określa minimalną szerokość kolumny. To, ile kolumn
zmieści się obok siebie, zależy od szerokości, jaką zajmuje widżet na
stronie; wszystkie kolumny w rzędzie mają tę samą szerokość, a wszystkie kafelki w
rzędzie tę samą wysokość.

| Rozmiar | Minimalna szerokość | Przy pełnej szerokości strony | Tablet | Telefon | Cechy szczególne |
| --- | --- | --- | --- | --- | --- |
| **Kompaktowy** | 160 px | około 7 | 4 | 2 | Mniejsza czcionka; opisy kończą się po trzech wierszach. Ikona w polu ikony ma taki sam rozmiar jak w trybie normalnym. |
| **Normalny** | 280 px | 4 | 2 | 1 | Kształt znany z poprzednich wersji. |
| **Duży** | 440 px | 2 | 1 | 1 | Obrazek po lewej, tekst po prawej, jak lista wiadomości. Jeśli kafelka jest węższa niż 420 px (telefon), obrazek ponownie znajduje się u góry. Pole ikon pozostaje obok siebie. |

## Kolory

Informacja pod kolorami sygnalizuje, gdy czcionka na danym obszarze jest słabo
czytelna (kontrast poniżej 4,5 : 1). Kombinacja ta nie jest jednak zabroniona.
Po najechaniu myszką obszar koloru staje się nieco ciemniejszy; wybrana
czcionka zachowuje swój kolor, zamiast zmieniać się na czerwony.

## Okno „Edytuj kafelki”

Okno zajmuje cały ekran. U góry znajdują się przyciski **Zastosuj**,
**Anuluj**, **Cofnij**, **Powtórz**, pomoc oraz przełącznik do
podglądu (edytor, pulpit, tablet, urządzenie mobilne). Poniżej znajdują się trzy kolumny:

| Obszar | Znaczenie |
| --- | --- |
| **Kafelki** (po lewej) | Wszystkie kafelki w kolejności, z miniaturą, tytułem i linkiem. Przeciągając uchwyt lub używając klawiatury, można zmienić ich kolejność; opcja **Nowy kafelek** dodaje go na końcu. |
| **Kafelek x z y** (środek) | Pola wybranej kafelki: **Treść** (tytuł, link), **Obraz** (biblioteka multimediów, adres, usuń) oraz **Więcej** (etykieta, opis, tekst alternatywny, nowa karta). Powyżej znajdują się opcje przesuwania, powielania i usuwania kafelków. |
| **Układ** (po prawej) | **Wygląd**, **Rozmiar**, **Powierzchnia**, **Czcionka** i **Pokaż strzałkę**; wszystko dotyczy całego rzędu. |

**Zastosuj** zapisuje kafelki i układ w widżecie, **Anuluj** odrzuca
je — w przypadku niezapisanych zmian pojawia się wcześniej pytanie. Status u góry wskazuje,
co uległo zmianie, na przykład „Zmieniono 1 kafelek, zmieniono układ”.

Kafelek bez tytułu zawiera w polu **Tytuł** informację „Bez tytułu
kafelek nie zostanie wyświetlony” i na liście nosi nazwę „Bez tytułu”. Pozostaje tam
i nie zostanie utracony podczas zapisywania; na stronie pojawi się dopiero,
gdy otrzyma tytuł.

## Pola kafelka

Kafelki, strzałka i styl są zapisywane łącznie w atrybucie `portfolio-config`
(`{"tiles":[…],"showChevron":true,"variant":"icon","size":"compact","background":"#E40045","textColor":"#FFFFFF"}`,
zakodowane). `variant` to `image` lub `icon`, `size` to `compact`, `normal`
lub `large`, kolory są podane w formacie `#RRGGBB`; brakujące lub nieprawidłowe wartości
są traktowane jako domyślne. Starsze widżety nadal przechowują kafelki jako listę JSON w
polu `tiles`, a strzałkę w `show-chevron`; oba są nadal odczytywane,
o ile `portfolio-config` nie ustawi odpowiedniej wartości, i wyglądają
tak jak dotychczas (kafelek obrazu, normalny). Format kafelków jest w obu przypadkach
taki sam:

| Pole | Okno | Obowiązkowe | Znaczenie |
| --- | --- | --- | --- |
| `title` | Tytuł | tak | Nagłówek kafelka. Jeśli go brakuje, kafelek jest pomijany. |
| `description` | Opis (w sekcji „Więcej”) | nie | Krótki tekst pod tytułem. |
| `badge` | Etykieta (w sekcji „Więcej”) | nie | Mała etykieta kategorii nad tytułem. |
| `image` | Obraz | nie | Adres obrazu. Jeśli go brakuje, kafelek nie ma obszaru obrazu. |
| `imageAlt` | Tekst alternatywny (w sekcji „Więcej”) | nie | Tekst alternatywny dla czytników ekranu. Pozostaw puste, jeśli obraz pełni wyłącznie funkcję dekoracyjną. |
| `link` | Link | nie | Adres docelowy kafelka. Bez adresu docelowego kafelek nie jest klikalny i nie wyświetla się strzałka. |
| `newTab` | Otwórz w nowej karcie (pod „Więcej”) | nie | `true` otwiera adres docelowy w nowej karcie. Domyślnie `false`. |
| `id` | — | nie | Unikalny identyfikator kafelka. Jeśli nie zostanie podany, zostanie przypisany automatycznie. |

W kafelku obrazów zdjęcia są przycinane do proporcji 16:9 i
całkowicie wypełniają obszar obrazu. Prosimy o dostarczenie motywów, w przypadku których
przycięcie na krawędziach nie przeszkadza. Natomiast w polu ikony obraz jest
dopasowywany i nigdy nie jest przycinany — w tym miejscu nadają się symbole i logo w formacie SVG
lub PNG z przezroczystym tłem, w kolorze czcionki (na
czerwonym polu domyślnym, czyli białym).
