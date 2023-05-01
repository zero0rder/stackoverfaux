export const seedQuestions = [
    {
      "id": 68462879,
      "title": "How to force a compile error in C++(17) if a function return value isn&#39;t checked? Ideally through the type system",
      "body": "<p>We are writing safety critical code and I'd like a stronger way than [[nodiscard]] to ensure that <em>checking of</em> function return values is caught by the compiler.</p>\n<p>Constraints:</p>\n<ul>\n<li>MSVC++ 2019</li>\n<li>Something that <em>doesn't</em> rely on warnings</li>\n<li>Warnings-as-Errors also doesn't work</li>\n<li>It's not feasible to constantly run static analysis</li>\n<li>Macros are OK</li>\n<li>Not a runtime check, but caught by the compiler</li>\n<li>Not exception based</li>\n</ul>\n<p>I've been trying to think how to create a type(s) that, if it's not assigned to a variable from a function return, the compiler flags an error.</p>\n<p>Example:</p>\n<pre><code>struct MustCheck\n{\n  bool success;\n  ...???... \n};\n\nMustCheck DoSomething( args )\n{\n  ...\n  return MustCheck{true};\n}\n\nint main(void) {\n  MustCheck res = DoSomething(blah);\n  if( !res.success ) { exit(-1); }\n\n  DoSomething( bloop ); // &lt;------- compiler error\n}\n  \n</code></pre>\n<p>If such a thing is provably impossible through the type system, I'll also accept that answer ;)</p>\n",
      "creation": 1626829337,
      "score": 3,
      "user": {
        "id": 1610174,
        "name": "daemacles"
      },
      "comments": [
        {
          "id": 120995277,
          "body": "If checking the return value is so important, why don&#39;t you throw an exception?",
          "user": {
            "id": 4706785,
            "name": "Peter"
          }
        },
        {
          "id": 120995290,
          "body": "Although compilers are &quot;encouraged&quot; to issue a warning with <code>[[nodiscard]]</code> if the return value is discarded, most compilers can be configured to treat warnings as errors, and cease compilation.   Microsoft compilers and IDEs support such an option.",
          "user": {
            "id": 4706785,
            "name": "Peter"
          }
        },
        {
          "id": 120995303,
          "body": "C++ just doesn&#39;t work this way. The native way to do this in C++ is to throw an exception upon failure, so a successful return from a function indicates that it succeeded.",
          "user": {
            "id": 3943312,
            "name": "Sam Varshavchik"
          }
        },
        {
          "id": 120995354,
          "body": "@Peter I understand about warnings-as-errors, but that is still based on warnings",
          "user": {
            "id": 1610174,
            "name": "daemacles"
          }
        },
        {
          "id": 120995367,
          "body": "Also, bear in mind, that any approach that (attempts at) forcing the caller to check a return value can be explicitly circumvented by the caller.   For example, if the compiler issues warnings/errors because of <code>[[nodiscard]]</code>, the caller can still beat the compiler into submission with a simple cast i.e. <code>(void)DoSomething(bloop)</code>.   There is a point where you have to rely on other programmers reading documentation and doing what is needed.",
          "user": {
            "id": 4706785,
            "name": "Peter"
          }
        },
        {
          "id": 120995392,
          "body": "@SamVarshavchik Thanks for the comment - I updated the question to clarify that we can&#39;t use an exception here.  I understand this is not the &quot;native&quot; way.  The question is whether it&#39;s possible.",
          "user": {
            "id": 1610174,
            "name": "daemacles"
          }
        },
        {
          "id": 120995397,
          "body": "If a warning is turned into an error, it&#39;s a true error that will fail the build. Why is this a problem? Isn&#39;t it what you want?",
          "user": {
            "id": 440558,
            "name": "Some programmer dude"
          }
        },
        {
          "id": 120995411,
          "body": "And what is the <i>actual</i> problem this is supposed to solve? Right now this question is more of an <a href=\"https://xyproblem.info/\" rel=\"nofollow noreferrer\">XY problem</a>.",
          "user": {
            "id": 440558,
            "name": "Some programmer dude"
          }
        },
        {
          "id": 120995444,
          "body": "Your MustCheck could check in its destructor (one that is marked <code>noexcept(false)</code>) if the object was checked, and if not then throw.  With the caveat that if it throws in the context of a throw-in-flight, it will terminate the application.",
          "user": {
            "id": 4641116,
            "name": "Eljay"
          }
        },
        {
          "id": 120995445,
          "body": "@Peter that&#39;s completely true - and (void) casting requires the programmer to explicitly acknowledge they are intentionally circumventing the compiler.  If context helps, this is for an API with a large surface area and a lot of junior programmers where we want to add explicit DANGER WILL ROBINSON alerts in the manner I described",
          "user": {
            "id": 1610174,
            "name": "daemacles"
          }
        },
        {
          "id": 120995488,
          "body": "@Eljay yes, I had a similar idea that would be caught at runtime, and that might be what we need to go with, however I was wondering if there is a way to encode this behavior in the type system itself such that &quot;not checking&quot; is equivalent to a language/type error.",
          "user": {
            "id": 1610174,
            "name": "daemacles"
          }
        },
        {
          "id": 120995525,
          "body": "Nope, C++&#39;s type system does not work this way.",
          "user": {
            "id": 3943312,
            "name": "Sam Varshavchik"
          }
        },
        {
          "id": 120995551,
          "body": "DoSomething could take two parameters: lambda to call on success, and lambda to call on failure.  That way, the caller is responsible for handling the success and failure cases explicitly (even if the handler is a no-op).",
          "user": {
            "id": 4641116,
            "name": "Eljay"
          }
        },
        {
          "id": 120995565,
          "body": "From what you describe, I suspect the <code>[[nodiscard]]</code> attribute, coupled with a build process that is configured (in a way that can&#39;t be changed by junior programmers) to treat warnings as errors will suffice.   Also, this seems a case where active mentoring of junior members of the team by senior members is warranted.   Essentially, getting junior programmers to do something necessary for the project is a non-technical problem, and a purely technical solution (forcing compilation to fail is a technical solution) to a non-technical problem is rarely a good idea.",
          "user": {
            "id": 4706785,
            "name": "Peter"
          }
        },
        {
          "id": 120995572,
          "body": "@Eljay The callback approach is interesting.  I hadn&#39;t considered it, but it conceptually could work.",
          "user": {
            "id": 1610174,
            "name": "daemacles"
          }
        },
        {
          "id": 120995601,
          "body": "@Peter All good points.  It&#39;s about layering safety.  I personally like to automate checking as much as possible, because humans err, and so this is an attempt to supplement social/process checks.  It might not be possible as I&#39;ve described, but still an interesting question.  And hopefully someday <code>[[cantdiscard]]</code> is added :)",
          "user": {
            "id": 1610174,
            "name": "daemacles"
          }
        },
        {
          "id": 120995630,
          "body": "<code>nodiscard</code> (configured to produce an error) does exactly what you are asking for -- there&#39;s no stronger error condition than producing an error . But you reject it out of hand with no real explanation. The code in your example will produce an error where requested, if function is marked [[nodiscard]] and you configure the compiler to produce an error for this.",
          "user": {
            "id": 1505939,
            "name": "M.M"
          }
        },
        {
          "id": 120995637,
          "body": "&quot;a type(s) that, if it&#39;s not assigned to a variable from a function return, the compiler flags an error.&quot; is possible but no help, as the coder could just make this assignment and then not use the resulting variable",
          "user": {
            "id": 1505939,
            "name": "M.M"
          }
        }
      ],
      "answers": [
        {
          "id": 68462942,
          "body": "<p>As mentioned in the comments you can use [[nodiscard]] as per:</p>\n<p><a href=\"https://docs.microsoft.com/en-us/cpp/cpp/attributes?view=msvc-160\" rel=\"nofollow noreferrer\">https://docs.microsoft.com/en-us/cpp/cpp/attributes?view=msvc-160</a></p>\n<p>And modify to use this warning as compile error:</p>\n<p><a href=\"https://docs.microsoft.com/en-us/cpp/preprocessor/warning?view=msvc-160\" rel=\"nofollow noreferrer\">https://docs.microsoft.com/en-us/cpp/preprocessor/warning?view=msvc-160</a></p>\n<p>That should cover your use case.</p>\n",
          "creation": 1626830114,
          "score": -1,
          "user": {
            "id": 8550160,
            "name": "jman"
          },
          "accepted": false,
          "comments": [
            {
              "id": 120995403,
              "body": "A link to a solution is welcome, but please ensure your answer is useful without it: <a href=\"//meta.stackexchange.com/a/8259\">add context around the link</a> so your fellow users will have some idea what it is and why it’s there, then quote the most relevant part of the page you&#39;re linking to in case the target page is unavailable. <a href=\"//stackoverflow.com/help/deleted-answers\">Answers that are little more than a link may be deleted</a>. (And before you say that&#39;s not possible with MS, they broke millions of links when they changed from MSDN to docs.)",
              "user": {
                "id": 62576,
                "name": "Ken White"
              }
            },
            {
              "id": 120995410,
              "body": "Thanks - I updated the question to clarify that it&#39;s not enough to enable warnings-as-errors.",
              "user": {
                "id": 1610174,
                "name": "daemacles"
              }
            }
          ]
        },
        {
          "id": 68463003,
          "body": "<p>For doing this at runtime there are recipes online about &quot;exploding&quot; types (they assert on destruction if they where not checked).</p>\n<p>For compile-time it is more tricky, returning (for example a <code>bool</code>) with <code>[[nodiscard]]</code> is not enough because there are ways of no discarding without checking for example assigning to a (bool) variable.</p>\n<p>I think the next layer is to active <code>-Wunused-variable -Wunused-expression</code> (and treat it like an error).\nThen it is much harder to not check the bool because that is pretty much to only operation you can really do with a bool.\n(You can assign to another bool but then you will have to use that variable).</p>\n<p>I guess that's quite enough.</p>\n<p>There are still Machiavelian ways to mark a variable as used.\nFor that you can invent a <code>bool</code>-like type (class) that is 1) <code>[[nodiscard]]</code> itself (classes can be marked <code>nodiscard</code>), 2) the only supported operation is <code>==(bool)</code> or <code>!=(bool)</code> (maybe not even copyable) and return that from your function. (as a bonus you don't need to mark your function as <code>[[nodiscard]]</code> because it is automatic.)</p>\n<p>I guess it is impossible to avoid something like <code>(void)b;</code> but that in itself becomes a flag.</p>\n",
          "creation": 1626830859,
          "score": 1,
          "user": {
            "id": 225186,
            "name": "alfC"
          },
          "accepted": false,
          "comments": [
            {
              "id": 120995468,
              "body": "C++ is meant to protect against Murphy, not Machiavelli.",
              "user": {
                "id": 4641116,
                "name": "Eljay"
              }
            },
            {
              "id": 120995481,
              "body": "@Eljay, I totally agree, that is why I pretty much would stop at &quot;I guess that is quite enough&quot;. What comes later is just a little game (and it has a little bonus). I think there is space for a <code>[[nodiscard]] class CheckedBool{...};</code> in a generic library.",
              "user": {
                "id": 225186,
                "name": "alfC"
              }
            },
            {
              "id": 120995523,
              "body": "@Eljay LOL!  I&#39;m using that next time someone complains about C++ ;)",
              "user": {
                "id": 1610174,
                "name": "daemacles"
              }
            }
          ]
        }
      ]
    },
    {
      "id": 68463022,
      "title": "How to add strings to a list and print the list?",
      "body": "<p>I want to create a program where it works like a simple bag. You can add items to the bag (in this case is strings) into a list. Here's my code:</p>\n<pre><code>class Items:\n    def __init__(self, name):\n        self.name = name\n    \nclass Bag:\n    def __init__(self, items, max_items):\n        # max_items is the maximum capacity of the Bag\n        self.items = items\n        self.max_items = max_items\n    \n    def add_items(self):\n        if len(self.items) &lt; self.max_items:\n           self.items.append(i.name)\n        \n    def read_items(self):\n        for item in self.items:\n            print(item.name)\n\ni = Items(&quot;Item1&quot;)\nb = Bag([], 10) # I'm just going to put example 10 strings for the max_items\nb.read_items()\n</code></pre>\n<p>From this code there is no output (just to be clear, I mean there's no input whatsoever, not the input &quot;None&quot;).</p>\n<p>My goal is to make the code run whatever is inside the list. In any conditions, even if there's items being added to the list.</p>\n",
      "creation": 1626831122,
      "score": 0,
      "user": {
        "id": 16295664,
        "name": "Bashfu"
      },
      "comments": [
        {
          "id": 120995508,
          "body": "You are not adding any items to the container with your <code>add_items</code> method, and therefore the <code>read_items</code> method has nothing to output.",
          "user": {
            "id": 6890912,
            "name": "blhsing"
          }
        },
        {
          "id": 120995548,
          "body": "Hey! Well you would need to append (insert) items to the list “self.items” first right? Also, you could just define the variable “self.items” inside the class as an attribute (self.items = [ ]) then append to it!",
          "user": {
            "id": 14492001,
            "name": "Omar AlSuwaidi"
          }
        },
        {
          "id": 120995592,
          "body": "@JohnKugelman I see, I tried it again with a simpler &#39;for&#39; loop mathod to read empty array, and the output is the word &quot;None&quot;. But in this case, that class doesn&#39;t show any word or error at the same time. It just prints out &quot;192:~ local$ /usr/local/bin/python3 /Users/local/Desktop/Python/question.py&quot; and asking for the next command. Meaning that my &#39;b.read_items()&#39; isn&#39;t executed properly.",
          "user": {
            "id": 16295664,
            "name": "Bashfu"
          }
        }
      ],
      "answers": [
        {
          "id": 68463046,
          "body": "<p>There are no calls to <code>add_items()</code>, and thus no items in the list.</p>\n",
          "creation": 1626831438,
          "score": 0,
          "user": {
            "id": 68587,
            "name": "John Kugelman"
          },
          "accepted": false,
          "comments": [
            {
              "id": 120995623,
              "body": "I see, thanks for the help :)",
              "user": {
                "id": 16295664,
                "name": "Bashfu"
              }
            }
          ]
        }
      ]
    },
    {
      "id": 68462964,
      "title": "Need help returning an array with two arrays: borrowed books and returned books",
      "body": "<p>I am trying to return an array with two arrays the first being borrowed books and the other being returned books. The prompt that I have to use is:</p>\n<p>The <code>partitionBooksByBorrowedStatus()</code> function in <code>public/src/books.js</code> has a single parameter:</p>\n<ul>\n<li>An array of books.</li>\n</ul>\n<p>It returns an array with two arrays inside of it. All of the inputted books are present in either the first or second array.</p>\n<p>The first array contains books <em>that have been loaned out, and are not yet returned</em> while the second array contains books <em>that have been returned.</em> You can check for the return status by looking at the first transaction in the <code>borrows</code> array.</p>\n<p>Here is a portion of the data provided:</p>\n<pre><code>const books = [{\nid: &quot;5f447132d487bd81da01e25e&quot;,\ntitle: &quot;sit eiusmod occaecat eu magna&quot;,\ngenre: &quot;Science&quot;,\nauthorId: 8,\nborrows: [\n  {\n    id: &quot;5f446f2e2cfa3e1d234679b9&quot;,\n    returned: false,\n  },\n  {\n    id: &quot;5f446f2ed3609b719568a415&quot;,\n    returned: true,\n  },\n  {\n    id: &quot;5f446f2e1c71888e2233621e&quot;,\n    returned: true,\n  },\n  {\n    id: &quot;5f446f2e6059326d9feb9a68&quot;,\n    returned: true,\n  },\n  {\n    id: &quot;5f446f2ede05a0b1e3394d8b&quot;,\n    returned: true,\n  },\n  {\n    id: &quot;5f446f2e4081699cdc6a2735&quot;,\n    returned: true,\n  },\n  {\n    id: &quot;5f446f2e3900dfec59489477&quot;,\n    returned: true,\n  },\n  {\n    id: &quot;5f446f2e6059326d9feb9a68&quot;,\n    returned: true,\n  },\n  {\n    id: &quot;5f446f2e409f8883af2955dd&quot;,\n    returned: true,\n  },\n  {\n    id: &quot;5f446f2e3900dfec59489477&quot;,\n    returned: true,\n  },\n  {\n    id: &quot;5f446f2eae901a82e0259947&quot;,\n    returned: true,\n  },\n  {\n    id: &quot;5f446f2ef2ab5f5a9f60c4f2&quot;,\n    returned: true,\n  },\n  {\n    id: &quot;5f446f2ea6b68cf6f85f6e28&quot;,\n    returned: true,\n  },\n  {\n    id: &quot;5f446f2eed18105706d6ca19&quot;,\n    returned: true,\n  },\n  {\n    id: &quot;5f446f2eae901a82e0259947&quot;,\n    returned: true,\n  },\n  {\n    id: &quot;5f446f2e91c2af00cb74e82b&quot;,\n    returned: true,\n  },\n  {\n    id: &quot;5f446f2e5aa2bb5545a0f8a6&quot;,\n    returned: true,\n  },\n  {\n    id: &quot;5f446f2ea508b6a99c3e42c6&quot;,\n    returned: true,\n  },\n  {\n    id: &quot;5f446f2e50cc2da9cd80efdb&quot;,\n    returned: true,\n  },\n  {\n    id: &quot;5f446f2e0b3e2ff72fc503e7&quot;,\n    returned: true,\n  },\n  {\n    id: &quot;5f446f2e91c2af00cb74e82b&quot;,\n    returned: true,\n  },\n  {\n    id: &quot;5f446f2ef795e593cd3cd19d&quot;,\n    returned: true,\n  },\n  {\n    id: &quot;5f446f2e2f35653fa80bf490&quot;,\n    returned: true,\n  },\n</code></pre>\n<p>Here is what I have tried so far:</p>\n<pre><code>function partitionBooksByBorrowedStatus(books) {\n\n  let available = [];\n  let unavailable = [];\n  const bookStatuses = [];\n\n  books.forEach((book) =&gt; {\n   const isBookReturned = book.borrows[0].returned;\n   if (isBookReturned) { // if book is returned\n     available.push(book);\n   } else { // if book is not returned\n     unavailable.push(book);\n   }\n });\n\n bookStatuses.push(available);\n bookStatuses.push(unavailable);\n\n return bookStatuses; //\n\n}\n</code></pre>\n<p>When I run the code it returns an error that states &quot;Expected 3 to equal 6&quot; for the life of me I cannot figure it out. Your comments and suggestions would be much appreciated, thanks!</p>\n",
      "creation": 1626830342,
      "score": 0,
      "user": {
        "id": 16490359,
        "name": "SwishitySwoosh"
      },
      "comments": [
        {
          "id": 120995485,
          "body": "How are you calling the function? The <code>return</code> isn&#39;t causing the error. What&#39;s the expected output?",
          "user": {
            "id": 1377002,
            "name": "Andy"
          }
        },
        {
          "id": 120995505,
          "body": "It’s a little unclear what the <code>3</code> or <code>6</code> are referring to. But your returned array appears to be backwards; the problem statement indicates the checked-out books (presumably unavailable) should be first.",
          "user": {
            "id": 438992,
            "name": "Dave Newton"
          }
        },
        {
          "id": 120995581,
          "body": "You may have to produce a <a href=\"https://stackoverflow.com/help/minimal-reproducible-example\">minimal reproducible example</a>, because as Dave says, you&#39;re not getting 3 or 6 from that data as far as I can see.",
          "user": {
            "id": 1377002,
            "name": "Andy"
          }
        },
        {
          "id": 120995595,
          "body": "My fault Dave was correct i had my return values reverse, i swapped the available.push(book) for the unavailable.push(book) and it fixed it. Thanks guys!",
          "user": {
            "id": 16490359,
            "name": "SwishitySwoosh"
          }
        }
      ],
      "answers": [
        {
          "id": 68463097,
          "body": "<p>Thank you to @ Dave Newton who mentioned that my returned arrays appeared to be backwards I was able to swap the return values so the correct code is now:</p>\n<pre><code>function partitionBooksByBorrowedStatus(books) {\nlet available = [];\nlet unavailable = [];\nconst bookStatuses = [];\nbooks.forEach((book) =&gt; {\n  const isBookReturned = book.borrows[0].returned;\n\nif (isBookReturned) { // if book is not returned\n  unavailable.push(book);\n} else { // if book is returned\n  available.push(book);\n}\n});\nbookStatuses.push(available);\nbookStatuses.push(unavailable);\nreturn bookStatuses;\n}\n</code></pre>\n",
          "creation": 1626832031,
          "score": 0,
          "user": {
            "id": 16490359,
            "name": "SwishitySwoosh"
          },
          "accepted": false,
          "comments": []
        },
        {
          "id": 68463102,
          "body": "<p>This can be done fairly easily with JavaScript's Array reduce method.  You need to provide the initial accumulator with an object that maps the expected output and then populate one of the two arrays depending on whether the book has at least one occurrence of the book not being returned.  (Could also be done by testing the number of &quot;returned == true&quot; is odd)</p>\n<p>Assumption: A book that's never been borrowed should count as &quot;being returned&quot;</p>\n<p><div class=\"snippet\" data-lang=\"js\" data-hide=\"false\" data-console=\"true\" data-babel=\"false\">\r\n<div class=\"snippet-code\">\r\n<pre class=\"snippet-code-js lang-js prettyprint-override\"><code>const books = [\n{\n    id: \"0\",\n    title: \"never borrowed\",\n    genre: \"Science\",\n    authorId: 8,\n    borrows: []\n},\n{\n    id: \"1\",\n    title: \"returned\",\n    genre: \"Science\",\n    authorId: 8,\n    borrows: [\n        {\n            id: \"5f446f2e2f35653fa80bf490\",\n            returned: true,\n        }\n    ]\n},\n{\n    id: \"5f447132d487bd81da01e25e\",\n    title: \"not returned\",\n    genre: \"Science\",\n    authorId: 8,\n    borrows: [\n        {\n            id: \"5f446f2e2cfa3e1d234679b9\",\n            returned: false,\n        }\n    ]\n}]\n\nfunction partitionBooksByBorrowedStatus(b) {\n    return b.reduce( (a, c) =&gt; { a[(c.borrows.length &amp;&amp; c.borrows.filter( book =&gt; !book.returned).length)?0:1].push(c); return a }, [[],[]] )\n}\n\nconsole.log(partitionBooksByBorrowedStatus(books))</code></pre>\r\n</div>\r\n</div>\r\n</p>\n",
          "creation": 1626832073,
          "score": 0,
          "user": {
            "id": 2487517,
            "name": "Tibrogargan"
          },
          "accepted": false,
          "comments": []
        }
      ]
    },
    {
      "id": 68462918,
      "title": "Setting javascript tabs",
      "body": "<p>Good day. I write tabs on javascript. The idea behind these tabs is soundly common, but there is a slight difference from the standard ones. When I click on the &quot;+&quot; button, all tabs should be closed and only the one that was clicked should open. Everything works well, but I just can not implement the closing of the tab on the second click of the button</p>\n<p><a href=\"https://i.stack.imgur.com/Vl52Z.png\" rel=\"nofollow noreferrer\"><img src=\"https://i.stack.imgur.com/Vl52Z.png\" alt=\"enter image description here\" /></a></p>\n<p>HTML</p>\n<pre><code>        &lt;div class=&quot;faq__tab&quot;&gt;\n          &lt;div class=&quot;faq__tab__question&quot;&gt;\n            Какие вложения необходимы для того, чтобы&lt;br&gt;\n            начать торговать на Wildberries?\n            &lt;div class=&quot;faq__tab__qeustion-btn&quot; data-tab='0'&gt;&lt;/div&gt;\n          &lt;/div&gt;\n          &lt;div class=&quot;faq__tab__answer&quot;&gt;\n            &lt;span class=&quot;tab-answer&quot;&gt;\n              Какие вложения необходимы для того, чтобы&lt;br&gt;\n              начать торговать на Wildberries?\n            &lt;/span&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n</code></pre>\n<p>JS</p>\n<pre><code>const tabButtons = document.querySelectorAll('.faq__tab__qeustion-btn');\nconst tabAnswers = document.querySelectorAll('.faq__tab__answer');\nconst answer = document.querySelectorAll('tab-answer');\n\nlet tabClicked = false;\n\ntabButtons.forEach((btn, index) =&gt; {\n\n  btn.addEventListener('click', selectTab)\n\n})\n\nfunction selectTab() {\n\n  tabButtons.forEach(button =&gt; {\n    button.classList.remove('faq__tab__qeustion-btn--active');\n  });\n\n  tabAnswers.forEach(answer =&gt; {\n    answer.classList.remove('faq__tab__answer--active');\n  })\n\n  this.classList.add('faq__tab__qeustion-btn--active');\n  tabAnswers[this.getAttribute('data-tab')].classList.add('faq__tab__answer--active');\n\n}\n</code></pre>\n",
      "creation": 1626829875,
      "score": 0,
      "user": {
        "id": 11452288,
        "name": "loveubae"
      },
      "comments": [],
      "answers": [
        {
          "id": 68462946,
          "body": "<p>Save the original state of the tab in a variable, then <a href=\"https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle\" rel=\"nofollow noreferrer\">toggle</a> the opposite of the original state on the clicked tab after closing all.</p>\n<pre><code>tabButtons.forEach((btn) =&gt; {\n    btn.addEventListener('click', selectTab)\n});\nfunction selectTab() {\n    const tab = tabAnswers[this.dataset.tab];\n    const makeThisActive = !tab.classList.contains('faq__tab__answer--active');\n    tabButtons.forEach(button =&gt; {\n        button.classList.remove('faq__tab__qeustion-btn--active');\n    });\n    tabAnswers.forEach(answer =&gt; {\n        answer.classList.remove('faq__tab__answer--active');\n    })\n    this.classList.toggle('faq__tab__qeustion-btn--active', makeThisActive);\n    tab.classList.toggle('faq__tab__answer--active', makeThisActive);\n}\n</code></pre>\n<p>I'd also recommend fixing the <code>qeustion</code> - looks like a typo, and typos are frequent causes of bugs in programming.</p>\n",
          "creation": 1626830137,
          "score": 0,
          "user": {
            "id": 9515207,
            "name": "CertainPerformance"
          },
          "accepted": false,
          "comments": []
        },
        {
          "id": 68462998,
          "body": "<p>Why you remove tabAnswers class from itself,</p>\n<pre><code>tabAnswers.forEach(answer =&gt; {\n\n  answer.classList.remove('faq__tab__answer--active');\n\n})\n</code></pre>\n<p>but add tabAnswers class on 'data-tab'?</p>\n<p><code>tabAnswers[this.getAttribute('data-tab')].classList.add('faq__tab__answer--active');</code></p>\n<hr />\n<p>Can you <strong>show more your code</strong> or post your code in any live demo web site, like Codepen?</p>\n",
          "creation": 1626830792,
          "score": 0,
          "user": {
            "id": 10684332,
            "name": "ShuYU"
          },
          "accepted": false,
          "comments": []
        }
      ]
    },
    {
      "id": 68463043,
      "title": "Generics in Java does not compile",
      "body": "<p>I am stuck trying to understand what exactly is going on over here. The two ways that the copy_v1 method is being used are shown below. The first way (1) produces a compile error. But the second way (2) does not produce any compile error (nor does it produce any runtime error when I try to execute the program once I comment out (1)). When I replace (2) with <code>copy_v1(new Wrapper&lt;String&gt;(&quot;Hello&quot;), new Wrapper&lt;Object&gt;(new Object()));</code>, I end up getting a compile error on (2) as well. Not sure what is happening. How is the code on (1) any different from (2)? Can someone shed some light on this please.</p>\n<p>Thanks.</p>\n<pre><code>public class SOQuestion {\n\n    public static &lt;T&gt; void copy_v1(Wrapper&lt;T&gt; source, Wrapper&lt;T&gt; dest) {\n        T srcObj = source.getRef();\n        dest.setRef(srcObj);\n    }\n\n    public static void main(String[] args) {\n        Wrapper&lt;Object&gt; objectWrapper = new Wrapper&lt;&gt;(new Object());\n        Wrapper&lt;String&gt; stringWrapper = new Wrapper&lt;&gt;(&quot;Hello&quot;);\n        copy_v1(stringWrapper, objectWrapper); // Compile error on this line (1)\n        copy_v1(new Wrapper&lt;&gt;(&quot;Hello&quot;), new Wrapper&lt;&gt;(new Object())); // But no error on this line (2)\n    }\n\n}\n\nclass Wrapper&lt;T&gt; {\n\n    private T ref;\n\n    Wrapper(T ref) {this.ref = ref;}\n\n    public T getRef() {return this.ref;}\n\n    public void setRef(T ref) {this.ref = ref;}\n}\n</code></pre>\n",
      "creation": 1626831371,
      "score": 0,
      "user": {
        "id": 8742428,
        "name": "rgbk21"
      },
      "comments": [
        {
          "id": 120995579,
          "body": "<code>new Wrapper&lt;&gt;(&quot;Hello&quot;)</code> is not the same type of class as <code>Wrapper&lt;String&gt;</code> I imagine some casting is happening",
          "user": {
            "id": 2310289,
            "name": "Scary Wombat"
          }
        }
      ],
      "answers": [
        {
          "id": 68463072,
          "body": "<p>When using <code>new Wrapper&lt;String&gt;(&quot;Hello&quot;)</code> as an argument to <code>copy_v1</code>, the inferred type is <code>Wrapper&lt;Object&gt;</code>, whereas with your first example, the type of <code>objectWrapper</code> is <code>Wrapper&lt;String&gt;</code>.</p>\n<p>Essentially:</p>\n<pre><code>copy_v1(new Wrapper&lt;&gt;(&quot;Hello&quot;), new Wrapper&lt;&gt;(new Object()));\n</code></pre>\n<p>is equivalent to:</p>\n<pre><code>Wrapper&lt;Object&gt; objectWrapper = new Wrapper&lt;&gt;(new Object());\nWrapper&lt;Object&gt; stringWrapper = new Wrapper&lt;&gt;(&quot;Hello&quot;);\ncopy_v1(stringWrapper, objectWrapper);\n</code></pre>\n<p>which isn't quite what you have in your first case.</p>\n",
          "creation": 1626831800,
          "score": 1,
          "user": {
            "id": 10082297,
            "name": "Henry Twist"
          },
          "accepted": false,
          "comments": []
        }
      ]
    },
    {
      "id": 68462903,
      "title": "Is it reasonable to use .map inside a form?",
      "body": "<p>I am trying to iterate n food products that all will have the same inputs, so whether or not the user will want X, Y, or Z elements to it.</p>\n<p>I thought the idea was pretty good at the beginning, but I realized that the idea went to downhill when I couldn't control the inputs by id (validations) as the id is repeating itself in every iteration.</p>\n<p>Here is my code of render()</p>\n<pre><code>&lt;div className=&quot;modal-body modalFood&quot; style={{ maxHeight: '400', overflowy: 'auto' }}&gt;\n              &lt;div className=&quot;container&quot;&gt;\n                &lt;form onSubmit={this.handleSubmit} id=&quot;form&quot;&gt;\n                  &lt;ul className=&quot;list-group list-group-flush&quot;&gt;\n\n\n                    {food.map((product, index) =&gt; (\n\n                      &lt;li className=&quot;list-group-item2&quot; key={product.idFood}&gt;\n                        //information about the food\n                                Amount:\n                              &lt;/label&gt;\n                              &lt;input\n                                value={amount}\n                                type=&quot;number&quot;\n                                min=&quot;0&quot;\n                                max=&quot;999&quot;\n                                name=&quot;amount&quot;\n                                style={{ borderColor: '#001689' }}\n                                autoComplete=&quot;off&quot;\n                                required\n                              /&gt;\n//more inputs\n\n                     ))}\n                    &lt;div className=&quot;modal-footer&quot;&gt;\n                      &lt;button type=&quot;submit&quot; className=&quot;btn btn-primary&quot;&gt;Save&lt;/button&gt;\n                    &lt;/div&gt;\n                  &lt;/ul&gt;\n                &lt;/form&gt;\n              &lt;/div&gt;\n</code></pre>\n<p>Is there a better way to do this? Or am I in the right track.</p>\n",
      "creation": 1626829621,
      "score": 0,
      "user": {
        "id": 10339394,
        "name": "frustratedProgrammer"
      },
      "comments": [
        {
          "id": 120995292,
          "body": "Shouldn&#39;t it be <code>key={product.idFood}</code>?",
          "user": {
            "id": 1377002,
            "name": "Andy"
          }
        },
        {
          "id": 120995297,
          "body": "Oh true, I messed up while changing the variables right now. Let me update",
          "user": {
            "id": 10339394,
            "name": "frustratedProgrammer"
          }
        },
        {
          "id": 120995351,
          "body": "Depending on what your validation function looks like (adding an <code>onChange={validateInput}</code> to the inputs for example), <code>map</code> is the right way to go. It returns a new array of &quot;things&quot; which React can use to update the DOM.",
          "user": {
            "id": 1377002,
            "name": "Andy"
          }
        }
      ],
      "answers": []
    },
    {
      "id": 68462917,
      "title": "pandas set value if dates are the same in two diffrent df according to dates range",
      "body": "<p>I have df:\nwhile disease is binary column ( 0 or 1)</p>\n<pre><code>diagnosis_date    id  disease\n2013-05-03         1     0\n2013-05-08         1     0\n2013-06-08         1     1\n2013-01-01         2     0 \n.....\n</code></pre>\n<p>and I have range of dates- 2013-01-01 until 2013-12-31:</p>\n<pre><code>date_index=pd.date_range(start='1/1/2013', end='31/12/2013')\ndates=pd.DataFrame(date_index,columns=['date'])\n</code></pre>\n<p>I want for each id in df, to set the date range as date_index, and if the date is the same as diagnosis date, to set the value like it in the disease column, otherwise the value will be set to zero.\n<strong>the desire df:</strong></p>\n<pre><code>date    id    disease\n01-01    1       0\n02-01     1      0\n03-01     1      0\n...\n05-03     1      0\n05-04     1      0\n...\n06-08    1      1\n ....\n12-31     1      0\n01-01     2      1\n01-02     2      0 \n...  \n</code></pre>\n<p>Thanks</p>\n",
      "creation": 1626829874,
      "score": 0,
      "user": {
        "id": 15954539,
        "name": "nay"
      },
      "comments": [
        {
          "id": 120995310,
          "body": "date <code>05-03</code> has disease as <code>0</code> in original df and <code>1</code> in desired df? Is that expected?",
          "user": {
            "id": 13628883,
            "name": "sharathnatraj"
          }
        },
        {
          "id": 120995409,
          "body": "my bad, I fix it",
          "user": {
            "id": 15954539,
            "name": "nay"
          }
        },
        {
          "id": 120995432,
          "body": "how many different id do you have?",
          "user": {
            "id": 9274732,
            "name": "Ben.T"
          }
        },
        {
          "id": 120995546,
          "body": "Do you want to match on ID and date or just date between the dfs and populate disease?",
          "user": {
            "id": 13628883,
            "name": "sharathnatraj"
          }
        },
        {
          "id": 120995573,
          "body": "I have 74 different id. I want to match according to id and date. for each id first set all the dates range (all days in 2013), and when the date meet &#39;diagnosis_date&#39;, set the value according to the &#39;disease&#39; column in df",
          "user": {
            "id": 15954539,
            "name": "nay"
          }
        }
      ],
      "answers": [
        {
          "id": 68463077,
          "body": "<p>Here you go:</p>\n<pre><code>date_index=pd.date_range(start='1/1/2013', end='31/12/2013')\ndates = pd.DataFrame()\nfor i in df.id.unique():\n    dates=pd.concat([dates,pd.DataFrame({'date':date_index, 'id' : np.full(len(date_index),i)})])\ndf.diagnosis_date = pd.to_datetime(df['diagnosis_date'])\ndf1 = pd.merge(dates,df, left_on=['id','date'], right_on=['id','diagnosis_date'], how='left')[['date','id','disease']].fillna(0)\ndf1['disease'] = df1.disease.astype(int)\n</code></pre>\n<p>Tested and prints correctly.</p>\n",
          "creation": 1626831851,
          "score": 0,
          "user": {
            "id": 13628883,
            "name": "sharathnatraj"
          },
          "accepted": false,
          "comments": []
        },
        {
          "id": 68463107,
          "body": "<p>Try this..</p>\n<pre><code>df = pd.read_clipboard() #read in your dataframe from clipboard\n\ndfp = df.pivot('diagnosis_date', 'id', 'disease') #reshape dataframe\ndfp.index = pd.to_datetime(dfp.index) #cast index to datetime\n\ndfp.reindex(pd.date_range('1/1/2013','12/31/2013'))\\  #add rows with reindex and pd.date_range\n   .rename_axis('date').fillna(0)\\  #fill with zeroes\n   .stack().rename('disease')\\  #Reshape back to original shape\n   .reset_index()\\\n   .sort_values(['id', 'date'])  #and sort\n</code></pre>\n<p>Output:</p>\n<pre><code>          date  id  disease\n0   2013-01-01   1      0.0\n2   2013-01-02   1      0.0\n4   2013-01-03   1      0.0\n6   2013-01-04   1      0.0\n8   2013-01-05   1      0.0\n..         ...  ..      ...\n721 2013-12-27   2      0.0\n723 2013-12-28   2      0.0\n725 2013-12-29   2      0.0\n727 2013-12-30   2      0.0\n729 2013-12-31   2      0.0\n</code></pre>\n",
          "creation": 1626832137,
          "score": 0,
          "user": {
            "id": 6361531,
            "name": "Scott Boston"
          },
          "accepted": false,
          "comments": []
        }
      ]
    },
    {
      "id": 68462883,
      "title": "Filter an array where obj[array[@]] is nil or empty",
      "body": "<p>Practising Ramda again.</p>\n<p>So the situation is I have an obj:</p>\n<pre><code>const originalObj = {\n  foo: &quot;bar&quot;,\n  std: &quot;min&quot;,\n  baz: &quot;&quot;,\n  key1: undefined,\n  key2: &quot;exit&quot;,\n  key3: &quot;val3&quot;,\n  key4: &quot;&quot;,\n};\n</code></pre>\n<p>And I have an array that I know beforehand:</p>\n<pre><code>const toCheckArray = [&quot;baz&quot;, &quot;key1&quot;, &quot;key2&quot;, &quot;key3&quot;, &quot;key4&quot;, &quot;key5&quot;];\n</code></pre>\n<p>For every element in the array, I need to check whether such element (as key) exists in the obj, and whether the corresponding value is nil/empty. If such key exists, and the value is non-zero/empty, then I make an HTTP call like this to update the value:</p>\n<pre><code>const findKey2AndUpdateObj = async (originalObj) =&gt; {\n  const originalKey2 = originalObj.key2;\n  const key2 = await remoteHttpCall(originalKey2);\n  return { ...originalObj, key2: key2 };\n};\n</code></pre>\n<p>For all the elements in the array, the remote HTTP call would be exactly the same, apart from the payload, of course.</p>\n<p>My way of thing is to filter the list first, by doing the following steps:</p>\n<ol>\n<li><code>const hasArray = filter(has(__, originalObj), toCheckArray);</code> this I believe will check whether the element as a prop exists in the target obj;</li>\n<li>I am trying to apply <code>complement(anyPass([isNil, isEmpty]))</code> to all the values of the obj and then somehow filter the corresponding key in the array;</li>\n<li>Iterate the array? to make API calls and then update the obj.</li>\n</ol>\n<p>I guess what I am thinking is not the best way of doing it. Would love to hear your ideas!\nAlso memorising the API call would be amazing too!</p>\n<hr />\n<p>Or maybe I should flip step 1 and step 2? Filter out all the nil/empty ones from the obj and then do the <code>has</code> check.</p>\n<hr />\n<p>I ended up doing this: <code> filter(has(__, reject(anyPass([isEmpty, isNil]))(obj)), __)(arr)</code>. But surely there is better way.</p>\n<p>Cheers!</p>\n",
      "creation": 1626829394,
      "score": 1,
      "user": {
        "id": 4249805,
        "name": "Linnan DU"
      },
      "comments": [
        {
          "id": 120995272,
          "body": "(Having no idea what Ramda is...) what&#39;s wrong with <code>for (toCheck of toCheckArray) { if (originalObj[toCheck]) { doStuff() } }</code>",
          "user": {
            "id": 2487517,
            "name": "Tibrogargan"
          }
        },
        {
          "id": 120995291,
          "body": "Hi @Tibrogargan ! Nah absolutely nothing wrong with that! And I guess you&#39;d imagine I know the ordinary way in js of solving this problem. Tho I am practising FP, and this question is tagged with FP.",
          "user": {
            "id": 4249805,
            "name": "Linnan DU"
          }
        },
        {
          "id": 120995314,
          "body": "Making things more complicated because you&#39;re &quot;doing FP&quot; is not a reason.  But here&#39;s an FP way of doing the same thing with more keystrokes and [arguably] less readability: <code>toCheckArray.forEach( toCheck =&gt; { if (originalObject[toCheck]) { doStuff(originalObject[toCheck]) } } )</code>",
          "user": {
            "id": 2487517,
            "name": "Tibrogargan"
          }
        }
      ],
      "answers": []
    },
    {
      "id": 68462972,
      "title": "my second AJAX script wont work after I call the first one",
      "body": "<p>I'm having problem with <code>ajax</code> call,</p>\n<p>my <code>ajax</code> statement works on the first call, but when I call another <code>ajax</code> after the first one it just wont work</p>\n<p>I'm calling both ajax script through combo box 1 and combo box 2</p>\n<p><a href=\"https://i.stack.imgur.com/ZDrYj.png\" rel=\"nofollow noreferrer\">AJAX Script</a></p>\n<p><a href=\"https://i.stack.imgur.com/i1ovb.png\" rel=\"nofollow noreferrer\">ComboBox 1</a></p>\n<p><a href=\"https://i.stack.imgur.com/OlrPh.png\" rel=\"nofollow noreferrer\">ComboBox 2</a></p>\n",
      "creation": 1626830452,
      "score": -4,
      "user": {
        "id": 8978442,
        "name": "Jerry"
      },
      "comments": [
        {
          "id": 120995406,
          "body": "Please take the <a href=\"https://stackoverflow.com/tour\">tour</a> and see <a href=\"https://stackoverflow.com/questions/how-to-ask\">How to Ask</a>",
          "user": {
            "id": 14853083,
            "name": "Tangentially Perpendicular"
          }
        },
        {
          "id": 120995555,
          "body": "I&#39;m sorry for confusing question, I rewrite it now",
          "user": {
            "id": 8978442,
            "name": "Jerry"
          }
        },
        {
          "id": 120995608,
          "body": "Quick tip: never post pictures of code.",
          "user": {
            "id": 248567,
            "name": "Kirk Beard"
          }
        },
        {
          "id": 120995631,
          "body": "ohh sorry im just new here, should i post it on text? thanks for the tip mate",
          "user": {
            "id": 8978442,
            "name": "Jerry"
          }
        }
      ],
      "answers": []
    },
    {
      "id": 68462910,
      "title": "Pointer to function instead if in c",
      "body": "<p>Hey stackoveflow community ! <br />\nI'm making a little calculator in C with only &quot;+, -, /, *, %&quot; parameters, and honestly, this is working fine ; But I would try to make it with pointer to function I think I will use a better syntax but I don't know where I may start and how can I do/can I use it? I would like improve myself.. Someone can explain me please.. Thank's in advance !</p>\n<pre><code>#include &lt;unistd.h&gt;\n#include &lt;stdio.h&gt;\n\nint     ft_atoi(char *str);\nvoid    ft_putnbr(int nb);\n\nint check_by_zero(int a, int b, char oper)\n{\n    int res;\n\n    if (oper == '/')\n    {\n        if (b == 0)\n        {\n            write(1, &quot;Stop : division by zero\\n&quot;, 24);\n            res = -1;\n        }\n        else\n            res = a / b;\n    }\n    if (oper == '%')\n    {\n        if (b == 0)\n        {\n            write(1, &quot;Stop : modulo by zero\\n&quot;, 22);\n            res = -1;\n        }\n        else\n            res = a % b;\n    }\n    return (res);\n}\n\nint do_result(int a, int b, char oper)\n{\n    int res;\n\n    if (oper == '-')\n        res = a - b;\n    if (oper == '+')\n        res = a + b;\n    if (oper == '/' || oper == '%')\n        res = check_by_zero(a, b, oper);\n    if (oper == '*')\n        res = a * b;\n    return (res);\n}\n\nint main(int ac, char **av)\n{\n    int     value1;\n    int     value2;\n    int     res;\n    char    c;\n\n    if (ac != 4)\n        return (0);\n    value1 = ft_atoi(av[1]);\n    value2 = ft_atoi(av[3]);\n    c = av[2][0];\n    if ((!(c == '+' || c == '-' || c == '*'\n        || c == '/' || c == '%')) || av[2][1] != 0)\n        res = 0;\n    else\n        res = do_result(value1, value2, c);\n    if (res != -1)\n    {\n        ft_putnbr(res);\n        write(1, &quot;\\n&quot;, 1);\n    }\n    return (0);\n}\n</code></pre>\n<p>EDIT: Can't use standard function. Only mine. This is the reason why I use write instead printf</p>\n",
      "creation": 1626829750,
      "score": 0,
      "user": {
        "id": 16436471,
        "name": "hugo hg"
      },
      "comments": [
        {
          "id": 120995308,
          "body": "You could simplify the big <code>if</code> condition in the <code>main</code> function a little bit, if you learn about <a href=\"https://en.m.wikipedia.org/wiki/De_Morgan%27s_laws\" rel=\"nofollow noreferrer\">De Morgan&#39;s laws</a>.",
          "user": {
            "id": 440558,
            "name": "Some programmer dude"
          }
        },
        {
          "id": 120995332,
          "body": "And what is the reason you use <code>write</code> to write your output rather than <code>printf</code>? What is your assignment? What are its requirements and limitations?",
          "user": {
            "id": 440558,
            "name": "Some programmer dude"
          }
        },
        {
          "id": 120995561,
          "body": "Note: <code>if (b == 0)</code> is a good check for <code>&#47;</code>, but code is missing the <code>INT_MIN&#47;-1</code> check.",
          "user": {
            "id": 2410359,
            "name": "chux - Reinstate Monica"
          }
        }
      ],
      "answers": []
    },
    {
      "id": 68462912,
      "title": "How to explode a list into new columns pandas",
      "body": "<p>Let's say I have the following df</p>\n<pre><code>  x\n1 ['abc','bac','cab']\n2 ['bac']\n3 ['abc','cab']\n</code></pre>\n<p>And I would like to take each element of each list and put it into a new row, like so</p>\n<pre><code>  abc bac cab\n1  1    1  1\n2  0    1  0\n3  1    0  1\n</code></pre>\n<p>I have referred to multiple links but can't seem to get this correctly.</p>\n<p>Thanks!</p>\n",
      "creation": 1626829786,
      "score": 0,
      "user": {
        "id": 13132728,
        "name": "bismo"
      },
      "comments": [
        {
          "id": 120995285,
          "body": "kindly share the source code : <code>df.to_dict()</code>",
          "user": {
            "id": 7175713,
            "name": "sammywemmy"
          }
        }
      ],
      "answers": [
        {
          "id": 68462930,
          "body": "<p>One approach with <a href=\"https://pandas.pydata.org/docs/reference/api/pandas.Series.str.join.html\" rel=\"nofollow noreferrer\"><code>str.join</code></a> + <a href=\"https://pandas.pydata.org/docs/reference/api/pandas.Series.str.get_dummies.html\" rel=\"nofollow noreferrer\"><code>str.get_dummies</code></a>:</p>\n<pre><code>out = df['x'].str.join(',').str.get_dummies(',')\n</code></pre>\n<p><code>out</code>:</p>\n<pre><code>   abc  bac  cab\n0    1    1    1\n1    0    1    0\n2    1    0    1\n</code></pre>\n<p>Or with <a href=\"https://pandas.pydata.org/docs/reference/api/pandas.Series.explode.html\" rel=\"nofollow noreferrer\"><code>explode</code></a> + <a href=\"https://pandas.pydata.org/docs/reference/api/pandas.get_dummies.html\" rel=\"nofollow noreferrer\"><code>pd.get_dummies</code></a> then <a href=\"https://pandas.pydata.org/docs/reference/api/pandas.core.groupby.GroupBy.max.html\" rel=\"nofollow noreferrer\"><code>groupby max</code></a>:</p>\n<pre><code>out = pd.get_dummies(df['x'].explode()).groupby(level=0).max()\n</code></pre>\n<p><code>out</code>:</p>\n<pre><code>   abc  bac  cab\n0    1    1    1\n1    0    1    0\n2    1    0    1\n</code></pre>\n<hr />\n<p>Can also do <a href=\"https://pandas.pydata.org/docs/reference/api/pandas.crosstab.html\" rel=\"nofollow noreferrer\"><code>pd.crosstab</code></a> after <code>explode</code> if want counts instead of dummies:</p>\n<pre><code>s = df['x'].explode()\nout = pd.crosstab(s.index, s)\n</code></pre>\n<p><code>out</code>:</p>\n<pre><code>x      abc  bac  cab\nrow_0               \n0        1    1    1\n1        0    1    0\n2        1    0    1\n</code></pre>\n<p>*Note output is the same here, but will be count if there are duplicates.</p>\n<hr />\n<p>DataFrame:</p>\n<pre><code>import pandas as pd\n\ndf = pd.DataFrame({\n    'x': [['abc', 'bac', 'cab'], ['bac'], ['abc', 'cab']]\n})\n</code></pre>\n",
          "creation": 1626829981,
          "score": 1,
          "user": {
            "id": 15497888,
            "name": "Henry Ecker"
          },
          "accepted": true,
          "comments": [
            {
              "id": 120995317,
              "body": "sorry, I simplified the example for the sake of the question. my strings are of multiple characters, so when I run this code there is a column for each character. I am looking for a column for each item of the list. See edit in my question.",
              "user": {
                "id": 13132728,
                "name": "bismo"
              }
            },
            {
              "id": 120995347,
              "body": "I don&#39;t understand code still works. Updated with new sample data but none of the code blocks have changed.",
              "user": {
                "id": 15497888,
                "name": "Henry Ecker"
              }
            },
            {
              "id": 120995359,
              "body": "the second one does. thank you. upvoted",
              "user": {
                "id": 13132728,
                "name": "bismo"
              }
            }
          ]
        }
      ]
    },
    {
      "id": 68462872,
      "title": "Json Deserialization | Cannot Deserialize Current Json",
      "body": "<p>I have below Json -</p>\n<pre><code>{&quot;property_id&quot;:&quot;53863730&quot;,&quot;name&quot;:&quot;Hayat Elhamra&quot;,&quot;address&quot;:{&quot;line_1&quot;:&quot;Jeddah&quot;,&quot;city&quot;:&quot;Jeddah&quot;,&quot;state_province_name&quot;:&quot;Jeddah&quot;,&quot;postal_code&quot;:&quot;23212&quot;,&quot;country_code&quot;:&quot;SA&quot;,&quot;obfuscation_required&quot;:false,&quot;localized&quot;:{&quot;links&quot;:{&quot;ar-SA&quot;:{&quot;method&quot;:&quot;GET&quot;,&quot;href&quot;:&quot;https://api.ean.com/2.4/properties/content?language=ar-SA&amp;property_id=53863730&amp;include=address&quot;}}}},&quot;location&quot;:{&quot;coordinates&quot;:{&quot;latitude&quot;:21.520902,&quot;longitude&quot;:39.158265}},&quot;phone&quot;:&quot;20-01145772035&quot;,&quot;category&quot;:{&quot;id&quot;:&quot;16&quot;,&quot;name&quot;:&quot;Apartment&quot;},&quot;rank&quot;:99999999,&quot;business_model&quot;:{&quot;expedia_collect&quot;:true,&quot;property_collect&quot;:true},&quot;dates&quot;:{&quot;added&quot;:&quot;2020-06-10T23:03:21.345Z&quot;,&quot;updated&quot;:&quot;2020-06-10T23:03:23.701Z&quot;},&quot;chain&quot;:{&quot;id&quot;:&quot;0&quot;,&quot;name&quot;:&quot;Independent&quot;},&quot;brand&quot;:{&quot;id&quot;:&quot;0&quot;,&quot;name&quot;:&quot;Independent&quot;}}\n{&quot;property_id&quot;:&quot;53183065&quot;,&quot;name&quot;:&quot;Carefully Furnished Bungalow With 2 Bathrooms, 7km From Pula&quot;,&quot;address&quot;:{&quot;line_1&quot;:&quot;1 x M 90,3&quot;,&quot;line_2&quot;:&quot;PRIVATE_VACATION_HOME 3&quot;,&quot;city&quot;:&quot;Fazana&quot;,&quot;state_province_name&quot;:&quot;Istria (county)&quot;,&quot;postal_code&quot;:&quot;52212&quot;,&quot;country_code&quot;:&quot;HR&quot;,&quot;obfuscation_required&quot;:true,&quot;localized&quot;:{&quot;links&quot;:{&quot;hr-HR&quot;:{&quot;method&quot;:&quot;GET&quot;,&quot;href&quot;:&quot;https://api.ean.com/2.4/properties/content?language=hr-HR&amp;property_id=53183065&amp;include=address&quot;}}}},&quot;ratings&quot;:{&quot;property&quot;:{&quot;rating&quot;:&quot;3.0&quot;,&quot;type&quot;:&quot;Star&quot;}},&quot;location&quot;:{&quot;coordinates&quot;:{&quot;latitude&quot;:44.93,&quot;longitude&quot;:13.8}},&quot;phone&quot;:&quot;410442743080&quot;,&quot;category&quot;:{&quot;id&quot;:&quot;17&quot;,&quot;name&quot;:&quot;Private vacation home&quot;},&quot;rank&quot;:99999999,&quot;business_model&quot;:{&quot;expedia_collect&quot;:true,&quot;property_collect&quot;:false},&quot;dates&quot;:{&quot;added&quot;:&quot;2020-05-13T21:06:42.861Z&quot;,&quot;updated&quot;:&quot;2020-05-18T21:57:39.242Z&quot;},&quot;statistics&quot;:{&quot;1073743378&quot;:{&quot;id&quot;:&quot;1073743378&quot;,&quot;name&quot;:&quot;Number of bedrooms - 2&quot;,&quot;value&quot;:&quot;2&quot;},&quot;1073743380&quot;:{&quot;id&quot;:&quot;1073743380&quot;,&quot;name&quot;:&quot;Max occupancy - 4&quot;,&quot;value&quot;:&quot;4&quot;},&quot;1073743379&quot;:{&quot;id&quot;:&quot;1073743379&quot;,&quot;name&quot;:&quot;Number of bathrooms - 2&quot;,&quot;value&quot;:&quot;2&quot;}},&quot;chain&quot;:{&quot;id&quot;:&quot;7278&quot;,&quot;name&quot;:&quot;Belvilla&quot;},&quot;brand&quot;:{&quot;id&quot;:&quot;7353&quot;,&quot;name&quot;:&quot;Belvilla&quot;}}\n{&quot;property_id&quot;:&quot;53182898&quot;,&quot;name&quot;:&quot;Snug Cottage in Pašman With Roofed Terrace&quot;,&quot;address&quot;:{&quot;line_1&quot;:&quot;Pasman&quot;,&quot;city&quot;:&quot;Pasman&quot;,&quot;state_province_name&quot;:&quot;Zadar&quot;,&quot;postal_code&quot;:&quot;23260&quot;,&quot;country_code&quot;:&quot;HR&quot;,&quot;obfuscation_required&quot;:true,&quot;localized&quot;:{&quot;links&quot;:{&quot;hr-HR&quot;:{&quot;method&quot;:&quot;GET&quot;,&quot;href&quot;:&quot;https://api.ean.com/2.4/properties/content?language=hr-HR&amp;property_id=53182898&amp;include=address&quot;}}}},&quot;ratings&quot;:{&quot;property&quot;:{&quot;rating&quot;:&quot;1.0&quot;,&quot;type&quot;:&quot;Star&quot;}},&quot;location&quot;:{&quot;coordinates&quot;:{&quot;latitude&quot;:43.891571,&quot;longitude&quot;:15.423619}},&quot;phone&quot;:&quot;410442743080&quot;,&quot;category&quot;:{&quot;id&quot;:&quot;11&quot;,&quot;name&quot;:&quot;Cottage&quot;},&quot;rank&quot;:99999999,&quot;business_model&quot;:{&quot;expedia_collect&quot;:true,&quot;property_collect&quot;:false},&quot;dates&quot;:{&quot;added&quot;:&quot;2020-05-13T21:13:49.155Z&quot;,&quot;updated&quot;:&quot;2020-05-27T21:02:31.808Z&quot;},&quot;statistics&quot;:{&quot;1073743378&quot;:{&quot;id&quot;:&quot;1073743378&quot;,&quot;name&quot;:&quot;Number of bedrooms - 2&quot;,&quot;value&quot;:&quot;2&quot;},&quot;1073743380&quot;:{&quot;id&quot;:&quot;1073743380&quot;,&quot;name&quot;:&quot;Max occupancy - 5&quot;,&quot;value&quot;:&quot;5&quot;},&quot;1073743379&quot;:{&quot;id&quot;:&quot;1073743379&quot;,&quot;name&quot;:&quot;Number of bathrooms - 1&quot;,&quot;value&quot;:&quot;1&quot;}},&quot;chain&quot;:{&quot;id&quot;:&quot;7278&quot;,&quot;name&quot;:&quot;Belvilla&quot;},&quot;brand&quot;:{&quot;id&quot;:&quot;7353&quot;,&quot;name&quot;:&quot;Belvilla&quot;}}\n</code></pre>\n<p>For this I have created below class structure -</p>\n<pre><code>public class Property\n{\n  public string property_id { get; set; }\n  public string name { get; set; }\n  public Address address { get; set; }\n  public Location location { get; set; }\n  public string phone { get; set; }\n  public Category category { get; set; }\n  public int rank { get; set; }\n  public Business_Model business_model { get; set; }\n  public Dates dates { get; set; }\n  public Chain chain { get; set; }\n  public Brand brand { get; set; }\n}\n\npublic class Address\n{\n  public string line_1 { get; set; }\n  public string city { get; set; }\n  public string state_province_name { get; set; }\n  public string postal_code { get; set; }\n  public string country_code { get; set; }\n  public bool obfuscation_required { get; set; }\n  public Localized localized { get; set; }\n}\n\npublic class Localized\n{\n  public Links links { get; set; }\n}\n\npublic class Links\n{\n  public ArSA arSA { get; set; }\n}\n\npublic class ArSA\n{\n  public string method { get; set; }\n  public string href { get; set; }\n}\n\npublic class Location\n{\n  public Coordinates coordinates { get; set; }\n}\n\npublic class Coordinates\n{\n  public float latitude { get; set; }\n  public float longitude { get; set; }\n}\n\npublic class Category\n{\n  public string id { get; set; }\n  public string name { get; set; }\n}\n\npublic class Business_Model\n{\n  public bool expedia_collect { get; set; }\n  public bool property_collect { get; set; }\n}\n\npublic class Dates\n{\n  public DateTime added { get; set; }\n  public DateTime updated { get; set; }\n}\n\npublic class Chain\n{\n  public string id { get; set; }\n  public string name { get; set; }\n}\n\npublic class Brand\n{\n  public string id { get; set; }\n  public string name { get; set; }\n}\n</code></pre>\n<p>I have below code where I am getting error -</p>\n<pre><code>using (StreamReader streamReader = new StreamReader(&quot;d://propertycontent.expediacollect.en-US.json&quot;))\n      {\n        using (var json = new JsonTextReader(streamReader))\n        {\n          JsonSerializer serializer = new JsonSerializer();\n          var properties= (List&lt;Property&gt;)serializer.Deserialize(json, typeof(List&lt;Property&gt;));       \n        }       \n      }\n</code></pre>\n<p><strong>Error -</strong></p>\n<pre><code>Newtonsoft.Json.JsonSerializationException: 'Cannot deserialize the current JSON object (e.g. {&quot;name&quot;:&quot;value&quot;}) into type 'System.Collections.Generic.List`1[Property]' because the type requires a JSON array (e.g. [1,2,3]) to deserialize correctly.\nTo fix this error either change the JSON to a JSON array (e.g. [1,2,3]) or change the deserialized type so that it is a normal .NET type (e.g. not a primitive type like integer, not a collection type like an array or List&lt;T&gt;) that can be deserialized from a JSON object. JsonObjectAttribute can also be added to the type to force it to deserialize from a JSON object.\nPath 'property_id', line 1, position 15.'\n</code></pre>\n",
      "creation": 1626829215,
      "score": 0,
      "user": {
        "id": 2536611,
        "name": "C Sharper"
      },
      "comments": [
        {
          "id": 120995587,
          "body": "The way it is formatted in the question, it does not look like valid json. Try adding  <code>{[</code> to the beginning of the json and <code>]}</code> to the end. This will make it a <code>List&lt;Property&gt;</code>.",
          "user": {
            "id": 14703882,
            "name": "xtryingx"
          }
        }
      ],
      "answers": [
        {
          "id": 68462974,
          "body": "<p>try this, you will have to install NewtonsoftJson</p>\n<pre><code>var jsonOrig= ...your json\nvar json = JsonConvert.SerializeObject(jsonOrig);\nvar jsonObj = JsonConvert.DeserializeObject&lt;DataRoot&gt;(json);\n</code></pre>\n<p>classes</p>\n<pre><code>public class DataRoot\n    {\n        public string property_id { get; set; }\n        public string name { get; set; }\n        public Address address { get; set; }\n        public Location location { get; set; }\n        public string phone { get; set; }\n        public Category category { get; set; }\n        public int rank { get; set; }\n        public BusinessModel business_model { get; set; }\n        public Dates dates { get; set; }\n        public Chain chain { get; set; }\n        public Brand brand { get; set; }\n    }\npublic class ArSA\n    {\n        public string method { get; set; }\n        public string href { get; set; }\n    }\n\n    public class Links\n    {\n        [JsonProperty(&quot;ar-SA&quot;)]\n        public ArSA ArSA { get; set; }\n    }\n\n    public class Localized\n    {\n        public Links links { get; set; }\n    }\n\n    public class Address\n    {\n        public string line_1 { get; set; }\n        public string city { get; set; }\n        public string state_province_name { get; set; }\n        public string postal_code { get; set; }\n        public string country_code { get; set; }\n        public bool obfuscation_required { get; set; }\n        public Localized localized { get; set; }\n    }\n\n    public class Coordinates\n    {\n        public double latitude { get; set; }\n        public double longitude { get; set; }\n    }\n\n    public class Location\n    {\n        public Coordinates coordinates { get; set; }\n    }\n\n    public class Category\n    {\n        public string id { get; set; }\n        public string name { get; set; }\n    }\n\n    public class BusinessModel\n    {\n        public bool expedia_collect { get; set; }\n        public bool property_collect { get; set; }\n    }\n\n    public class Dates\n    {\n        public DateTime added { get; set; }\n        public DateTime updated { get; set; }\n    }\n\n    public class Chain\n    {\n        public string id { get; set; }\n        public string name { get; set; }\n    }\n\n    public class Brand\n    {\n        public string id { get; set; }\n        public string name { get; set; }\n    }\n\n    `````\n</code></pre>\n",
          "creation": 1626830497,
          "score": 1,
          "user": {
            "id": 11392290,
            "name": "Serge"
          },
          "accepted": false,
          "comments": []
        },
        {
          "id": 68463091,
          "body": "<p>It is not deserializing because it is not valid json. To make it valid, and to make it a <code>List&lt;Property&gt;</code> add <code>{[</code> to the beginning of the json and <code>]}</code> to the end of the json. Just enclose the json in <code>{[ ... ]}</code> to make it valid and it will deserialize assuming the rest of it is valid and is not missing any commas or brackets.</p>\n",
          "creation": 1626831997,
          "score": 0,
          "user": {
            "id": 14703882,
            "name": "xtryingx"
          },
          "accepted": false,
          "comments": [
            {
              "id": 120995641,
              "body": "I think you want just <code>[...]</code> not <code>{[...]}</code>",
              "user": {
                "id": 14868997,
                "name": "Charlieface"
              }
            }
          ]
        }
      ]
    },
    {
      "id": 68462891,
      "title": "Two Components Connected to Each-other",
      "body": "<p>Two of my React components are connected together. You might be thinking, if they are both separate components then they shouldn't be connected, right. WRONG.</p>\n<p>What I want to do is this. I want to create a footer but the footer is apparently linked to another component. I think this is a react bug but I have decided not to go there in case it's just my fault. I want to change the width of the footer to be max width with the screen but it doesn't work, it changes both of the components width.</p>\n<pre><code>.footer {\n   width: 100%;\n}\n</code></pre>\n<p><div class=\"snippet\" data-lang=\"js\" data-hide=\"false\" data-console=\"true\" data-babel=\"false\">\r\n<div class=\"snippet-code\">\r\n<pre class=\"snippet-code-css lang-css prettyprint-override\"><code>.footer {\n    background-color: gray;\n    border: 1px solid gray;\n    border-radius: 1px;\n    height: 100px;\n    width: 10000px; /*Or 100%*/\n}\n\n.otherComponent {\n  /*For some reason it copies the same attributes as the css one above (there in different files by the way*/\n  width: 10000px; /*Or 100%*/ /*The one that got copied by react.*/\n  background-color: gray;\n  border: 1px solid gray;\n  border-radius: 1px;\n  height: 100px;\n}</code></pre>\r\n<pre class=\"snippet-code-html lang-html prettyprint-override\"><code>&lt;div class=\"otherComponent\"&gt;\n\n&lt;/div&gt;\n&lt;br /&gt;\n&lt;p&gt;This is to demonstrate the bug/error that is happening with my program. And what it looks like&lt;/p&gt;\n&lt;div class=\"footer\"&gt;\n            \n&lt;/div&gt;</code></pre>\r\n</div>\r\n</div>\r\n</p>\n",
      "creation": 1626829468,
      "score": 0,
      "user": {
        "id": 16215251,
        "name": "TahaHaza00"
      },
      "comments": [
        {
          "id": 120995413,
          "body": "Do both CSS classes have the same name? What are you using to bundle your app? Are you using CSS Modules? Your provided code gives us no insight into what the cause could be just the result you are receiving.",
          "user": {
            "id": 4364635,
            "name": "Jacob Smit"
          }
        }
      ],
      "answers": []
    },
    {
      "id": 68463051,
      "title": "How can I make a 2-D array in C using user inputs",
      "body": "<p>I tried to make a 2-D array given the numbers of rows and columns as the user input.</p>\n<pre><code>int main(void)\n{\n   int nx, ny;\n   scanf_s(&quot;%d&quot;, &amp;nx);\n   scanf_s(&quot;%d&quot;, &amp;ny);\n   int array[nx][ny];\n   return 0;\n}\n</code></pre>\n<p>But VSC is telling me that I must have constants in the parenthesis [].</p>\n<p>Is there any way I can convert 'nx' and 'ny' as constant?</p>\n<p>Or is there any other way to declare 2-D or N-D arrays without converting their dtype?</p>\n",
      "creation": 1626831485,
      "score": 0,
      "user": {
        "id": 16491792,
        "name": "patha"
      },
      "comments": [
        {
          "id": 120995566,
          "body": "MSVC doesn&#39;t support this, you will have to use a different compiler or dynamic allocation",
          "user": {
            "id": 1505939,
            "name": "M.M"
          }
        },
        {
          "id": 120995593,
          "body": "@M.M Oh.... that&#39;s sad. Thank you for the answer!",
          "user": {
            "id": 16491792,
            "name": "patha"
          }
        }
      ],
      "answers": [
        {
          "id": 68463082,
          "body": "<p>C99 introduced &quot;Variable Length Arrays&quot; (<a href=\"https://en.wikipedia.org/wiki/Variable-length_array\" rel=\"nofollow noreferrer\">&quot;VLAs&quot;</a>), but I would strongly discourage their use.\nYour best bet is to use good old <a href=\"https://man7.org/linux/man-pages/man3/malloc.3.html\" rel=\"nofollow noreferrer\">malloc()</a></p>\n<blockquote>\n<p>EXAMPLE:</p>\n<p><a href=\"https://www.geeksforgeeks.org/dynamically-allocate-2d-array-c/\" rel=\"nofollow noreferrer\">https://www.geeksforgeeks.org/dynamically-allocate-2d-array-c/</a></p>\n<pre><code>#include &lt;stdio.h&gt;\n#include &lt;stdlib.h&gt;\n \nint main()\n{\n    int r = 3, c = 4; //Taking number of Rows and Columns\n    int *ptr, count = 0, i;\n    ptr = (int *)malloc((r * c) * sizeof(int)); //Dynamically Allocating Memory\n    for (i = 0; i &lt; r * c; i++)\n    {\n        ptr[i] = i + 1; //Giving value to the pointer and simultaneously printing it.\n        printf(&quot;%d &quot;, ptr[i]);\n        if ((i + 1) % c == 0)\n        {\n            printf(&quot;\\n&quot;);\n        }\n    }\n    free(ptr);\n}\n</code></pre>\n</blockquote>\n",
          "creation": 1626831925,
          "score": 1,
          "user": {
            "id": 421195,
            "name": "paulsm4"
          },
          "accepted": false,
          "comments": []
        }
      ]
    },
    {
      "id": 68462871,
      "title": "plotting variables from 2 different df together",
      "body": "<pre><code>Data1 &lt;- data.frame(AGE=c(20,30,15,22,80),\n                               CAR = c(1,1,3,9,1),\n                               BIKE = c(2,NA,4,NA,9),\n                               PLANE = c(8,NA,6,7,9),\n                               BOAT = c(1,2,NA,4,NA),\n                               WALKING=c(3,5,5,9,1),\n                               SCOOTER = c(2,NA,6,9,NA))\n\nData2 &lt;- data.frame(AGE=c(20,30,15,22,80),\n                               CAR = c(1,1,3,9,1),\n                               BIKE = c(2,NA,4,NA,9),\n                               PLANE = c(8,NA,6,7,9),\n                               BOAT = c(1,2,NA,4,NA),\n                               WALKING=c(3,5,5,9,1),\n                               SCOOTER = c(2,4,6,9,3))\n</code></pre>\n<p>I have a data frame <code>Data1</code> where I imputed the missing values in the variable “SCOOTER” to get Data2.</p>\n<p>I want to do a density plot for the variable <code>SCOOTER</code> using both <code>Data1</code> and <code>Data2</code>. I can do this separately;</p>\n<pre><code>Plot &lt;- ggplot(data=Data1, aes(x=SCOTTER)) +\n        geom_histogram(aes(y=..density..), colour=&quot;black&quot;, fill=&quot;white&quot;)+ \n        geom_density(alpha=.2, fill=&quot;Blue&quot;)+ \n        xlab('Data1 table')+\n        ylab('Probability Density Function')\n\n\nPlot &lt;- ggplot(data=Data2, aes(x=SCOTTER)) +\n        geom_histogram(aes(y=..density..), colour=&quot;black&quot;, fill=&quot;white&quot;)+ \n        geom_density(alpha=.2, fill=&quot;pink&quot;)+ \n        xlab('Data2 table')+\n        ylab('Probability Density Function')\n</code></pre>\n<p>Is there a way to combine these plots together - so I have the plots on the same frame like this:</p>\n<p><a href=\"https://i.stack.imgur.com/lb3Z7.png\" rel=\"nofollow noreferrer\"><img src=\"https://i.stack.imgur.com/lb3Z7.png\" alt=\"enter image description here\" /></a></p>\n",
      "creation": 1626829209,
      "score": 0,
      "user": {
        "id": 16491668,
        "name": "lizzy"
      },
      "comments": [],
      "answers": []
    },
    {
      "id": 68463071,
      "title": "Why can&#39;t I call other functions inside a friend function?",
      "body": "<p>I have a <code>Vector</code> class that for which I'm trying to implement a friend <code>Insert</code> function.</p>\n<pre><code>template&lt;typename T, class ALLOCATOR&gt;\nclass Vector {\npublic:\n    void Insert() { ... }\n    uint32_t GetLength() { ... }\n\n    friend void Insert(const Vector&amp; vector, auto&amp; buffer) {\n        Insert(vector.GetLength(), buffer); //this line gets the error\n        for (const auto&amp; e : vector) { Insert(e, buffer); }\n    }\n}\n</code></pre>\n<p>But when I do so the compiler says that I can't call a non static function without an object as if i was trying to call <code>Vector::Insert</code> instead of a free function.</p>\n<p>And when I tried to move the definition outside of the class.</p>\n<pre><code>template&lt;typename T, class ALLOCATOR&gt;\nvoid Insert(const Vector&lt;T, ALLOCATOR&gt;&amp; vector, auto&amp; buffer) {\n        Insert(vector.GetLength(), buffer); //this line gets the error\n        for (const auto&amp; e : vector) { Insert(e, buffer); }\n}\n</code></pre>\n<p>Then I got an undefined symbol linker error saying that no code was found for some of the <code>Vector</code> instantiations in my code.\nI tried using <code>::Insert</code> but that still didn't work.\nAll necesary <code>Insert</code> overloads are defined.\nAll code is in an <code>.hpp</code> file so it's not that the overloads where defined in a <code>.cpp</code> file.</p>\n",
      "creation": 1626831783,
      "score": -1,
      "user": {
        "id": 11003927,
        "name": "Facundo Villa"
      },
      "comments": [
        {
          "id": 120995639,
          "body": "You need to use <code>vector.Insert(e, buffer);</code>  (it&#39;s an external function)",
          "user": {
            "id": 3807729,
            "name": "Galik"
          }
        },
        {
          "id": 120995640,
          "body": "What are expectations for friend member functions?",
          "user": {
            "id": 6752050,
            "name": "S.M."
          }
        }
      ],
      "answers": []
    },
    {
      "id": 68462966,
      "title": "Very weird $_GET behavior (parameters getting mixed)",
      "body": "<p>I just came across a really strange issue while debugging some PHP.\nHere is the querystring</p>\n<pre><code>https://example.com/password-recovery?token=2328chsd790slo7jsal&amp;id_customer=40\n</code></pre>\n<p>For some reason, when using $_GET, it returns:</p>\n<pre><code>[token] =&gt; 2328chsd790slo7jsal&amp;id_customer\n[id_customer] =&gt; 40\n</code></pre>\n<p>Thus, token is always containing a bad value. It's the first time I see this in over 16 years. Is it some wrong server setting? Everything else on the site works correctly, only this specific page is broken</p>\n<p>As requested, here is the htaccess (changed the url of the site to example.com)</p>\n<pre><code>modpagespeed off\nphp_value auto_prepend_file /home/example/public_html/astra/astra-inc.php\n# ~~start~~ Do not remove this comment, Prestashop will keep automatically the code outside this comment when .htaccess will be generated again\n# .htaccess automaticaly generated by PrestaShop e-commerce open-source solution\n# http://www.prestashop.com - http://www.prestashop.com/forums\n\n&lt;IfModule mod_rewrite.c&gt;\n&lt;IfModule mod_env.c&gt;\nSetEnv HTTP_MOD_REWRITE On\n&lt;/IfModule&gt;\n\nRewriteEngine on\n\n\n#Domain: example.com\nRewriteRule . - [E=REWRITEBASE:/]\nRewriteRule ^api(?:/(.*))?$ %{ENV:REWRITEBASE}webservice/dispatcher.php?url=$1 [QSA,L]\n\n# Images\nRewriteCond %{HTTP_HOST} ^example.com$\nRewriteRule ^([0-9])(\\-[_a-zA-Z0-9-]*)?(-[0-9]+)?/.+\\.jpg$ %{ENV:REWRITEBASE}img/p/$1/$1$2$3.jpg [L]\nRewriteCond %{HTTP_HOST} ^example.com$\nRewriteRule ^([0-9])([0-9])(\\-[_a-zA-Z0-9-]*)?(-[0-9]+)?/.+\\.jpg$ %{ENV:REWRITEBASE}img/p/$1/$2/$1$2$3$4.jpg [L]\nRewriteCond %{HTTP_HOST} ^example.com$\nRewriteRule ^([0-9])([0-9])([0-9])(\\-[_a-zA-Z0-9-]*)?(-[0-9]+)?/.+\\.jpg$ %{ENV:REWRITEBASE}img/p/$1/$2/$3/$1$2$3$4$5.jpg [L]\nRewriteCond %{HTTP_HOST} ^example.com$\nRewriteRule ^([0-9])([0-9])([0-9])([0-9])(\\-[_a-zA-Z0-9-]*)?(-[0-9]+)?/.+\\.jpg$ %{ENV:REWRITEBASE}img/p/$1/$2/$3/$4/$1$2$3$4$5$6.jpg [L]\nRewriteCond %{HTTP_HOST} ^example.com$\nRewriteRule ^([0-9])([0-9])([0-9])([0-9])([0-9])(\\-[_a-zA-Z0-9-]*)?(-[0-9]+)?/.+\\.jpg$ %{ENV:REWRITEBASE}img/p/$1/$2/$3/$4/$5/$1$2$3$4$5$6$7.jpg [L]\nRewriteCond %{HTTP_HOST} ^example.com$\nRewriteRule ^([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])(\\-[_a-zA-Z0-9-]*)?(-[0-9]+)?/.+\\.jpg$ %{ENV:REWRITEBASE}img/p/$1/$2/$3/$4/$5/$6/$1$2$3$4$5$6$7$8.jpg [L]\nRewriteCond %{HTTP_HOST} ^example.com$\nRewriteRule ^([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])(\\-[_a-zA-Z0-9-]*)?(-[0-9]+)?/.+\\.jpg$ %{ENV:REWRITEBASE}img/p/$1/$2/$3/$4/$5/$6/$7/$1$2$3$4$5$6$7$8$9.jpg [L]\nRewriteCond %{HTTP_HOST} ^example.com$\nRewriteRule ^([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])(\\-[_a-zA-Z0-9-]*)?(-[0-9]+)?/.+\\.jpg$ %{ENV:REWRITEBASE}img/p/$1/$2/$3/$4/$5/$6/$7/$8/$1$2$3$4$5$6$7$8$9$10.jpg [L]\nRewriteCond %{HTTP_HOST} ^example.com$\nRewriteRule ^c/([0-9]+)(\\-[\\.*_a-zA-Z0-9-]*)(-[0-9]+)?/.+\\.jpg$ %{ENV:REWRITEBASE}img/c/$1$2$3.jpg [L]\nRewriteCond %{HTTP_HOST} ^example.com$\nRewriteRule ^c/([a-zA-Z_-]+)(-[0-9]+)?/.+\\.jpg$ %{ENV:REWRITEBASE}img/c/$1$2.jpg [L]\n# AlphaImageLoader for IE and fancybox\nRewriteRule ^images_ie/?([^/]+)\\.(jpe?g|png|gif)$ js/jquery/plugins/fancybox/images/$1.$2 [L]\n\n# Dispatcher\nRewriteCond %{REQUEST_FILENAME} -s [OR]\nRewriteCond %{REQUEST_FILENAME} -l [OR]\nRewriteCond %{REQUEST_FILENAME} -d\nRewriteRule ^.*$ - [NC,L]\nRewriteRule ^.*$ %{ENV:REWRITEBASE}index.php [NC,L]\n&lt;/IfModule&gt;\n\nAddType application/vnd.ms-fontobject .eot\nAddType font/ttf .ttf\nAddType font/otf .otf\nAddType application/font-woff .woff\nAddType font/woff2 .woff2\n&lt;IfModule mod_headers.c&gt;\n    &lt;FilesMatch &quot;\\.(ttf|ttc|otf|eot|woff|woff2|svg)$&quot;&gt;\n        Header set Access-Control-Allow-Origin &quot;*&quot;\n    &lt;/FilesMatch&gt;\n&lt;/IfModule&gt;\n\n&lt;IfModule mod_expires.c&gt;\n    ExpiresActive On\n    ExpiresByType image/gif &quot;access plus 1 month&quot;\n    ExpiresByType image/jpeg &quot;access plus 1 month&quot;\n    ExpiresByType image/png &quot;access plus 1 month&quot;\n    ExpiresByType text/css &quot;access plus 1 week&quot;\n    ExpiresByType text/javascript &quot;access plus 1 week&quot;\n    ExpiresByType application/javascript &quot;access plus 1 week&quot;\n    ExpiresByType application/x-javascript &quot;access plus 1 week&quot;\n    ExpiresByType image/x-icon &quot;access plus 1 year&quot;\n    ExpiresByType image/svg+xml &quot;access plus 1 year&quot;\n    ExpiresByType image/vnd.microsoft.icon &quot;access plus 1 year&quot;\n    ExpiresByType application/font-woff &quot;access plus 1 year&quot;\n    ExpiresByType application/x-font-woff &quot;access plus 1 year&quot;\n    ExpiresByType font/woff2 &quot;access plus 1 year&quot;\n    ExpiresByType application/vnd.ms-fontobject &quot;access plus 1 year&quot;\n    ExpiresByType font/opentype &quot;access plus 1 year&quot;\n    ExpiresByType font/ttf &quot;access plus 1 year&quot;\n    ExpiresByType font/otf &quot;access plus 1 year&quot;\n    ExpiresByType application/x-font-ttf &quot;access plus 1 year&quot;\n    ExpiresByType application/x-font-otf &quot;access plus 1 year&quot;\n&lt;/IfModule&gt;\n\n&lt;IfModule mod_headers.c&gt;\n    Header unset Etag\n&lt;/IfModule&gt;\nFileETag none\n&lt;IfModule mod_deflate.c&gt;\n    &lt;IfModule mod_filter.c&gt;\n        AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/x-javascript font/ttf application/x-font-ttf font/otf application/x-font-otf font/opentype image/svg+xml\n    &lt;/IfModule&gt;\n&lt;/IfModule&gt;\n\n#If rewrite mod isn't enabled\nErrorDocument 404 /index.php?controller=404\n\n# ~~end~~ Do not remove this comment, Prestashop will keep automatically the code outside this comment when .htaccess will be generated again\n\n# php -- BEGIN cPanel-generated handler, do not edit\n# Set the “ea-php72” package as the default “PHP” programming language.\n&lt;IfModule mime_module&gt;\n  AddHandler application/x-httpd-ea-php72___lsphp .php .php7 .phtml\n&lt;/IfModule&gt;\n# php -- END cPanel-generated handler, do not edit\n\n# BEGIN cPanel-generated php ini directives, do not edit\n# Manual editing of this file may result in unexpected behavior.\n# To make changes to this file, use the cPanel MultiPHP INI Editor (Home &gt;&gt; Software &gt;&gt; MultiPHP INI Editor)\n# For more information, read our documentation (https://go.cpanel.net/EA4ModifyINI)\n&lt;IfModule php7_module&gt;\n   php_flag display_errors Off\n   php_value max_execution_time 300\n   php_value max_input_time 600\n   php_value max_input_vars 1000\n   php_value memory_limit 2048M\n   php_value post_max_size 256M\n   php_value session.gc_maxlifetime 1440\n   php_value session.save_path &quot;/tmp&quot;\n   php_value upload_max_filesize 256M\n   php_flag zlib.output_compression Off\n&lt;/IfModule&gt;\n&lt;IfModule lsapi_module&gt;\n   php_flag display_errors Off\n   php_value max_execution_time 300\n   php_value max_input_time 600\n   php_value max_input_vars 1000\n   php_value memory_limit 2048M\n   php_value post_max_size 256M\n   php_value session.gc_maxlifetime 1440\n   php_value session.save_path &quot;/tmp&quot;\n   php_value upload_max_filesize 256M\n   php_flag zlib.output_compression Off\n&lt;/IfModule&gt;\n# END cPanel-generated php ini directives, do not edit\n</code></pre>\n",
      "creation": 1626830390,
      "score": 0,
      "user": {
        "id": 1707385,
        "name": "NemoPS"
      },
      "comments": [
        {
          "id": 120995365,
          "body": "Just to clarify, I can fix it real quick b exploding it and passing the 0th element to the rest of the code, but I&#39;d rather know what&#39;s wrong and why it does that.",
          "user": {
            "id": 1707385,
            "name": "NemoPS"
          }
        },
        {
          "id": 120995376,
          "body": "Do you have any URL rewriting rules in place? If so, perhaps they&#39;re misconfigured",
          "user": {
            "id": 283366,
            "name": "Phil"
          }
        },
        {
          "id": 120995405,
          "body": "There is an .htaccess with a few rewriting rules (which I did not write), but they are the same across the whole platform, and the same platform is used by other people on a few sites I manage. Nobody ever encountered this same issue.",
          "user": {
            "id": 1707385,
            "name": "NemoPS"
          }
        },
        {
          "id": 120995418,
          "body": "@NemoPS Please, do share your <code>.htaccess</code> content with us.",
          "user": {
            "id": 4475908,
            "name": "Zlatan Omerović"
          }
        },
        {
          "id": 120995419,
          "body": "On further analysis, it seems the same page has this issue with anything as first query parameter",
          "user": {
            "id": 1707385,
            "name": "NemoPS"
          }
        },
        {
          "id": 120995486,
          "body": "Posted the htaccess",
          "user": {
            "id": 1707385,
            "name": "NemoPS"
          }
        }
      ],
      "answers": []
    },
    {
      "id": 68462992,
      "title": "How to make new variables using exec() in imported method (python)",
      "body": "<p>get_data.py</p>\n<pre><code>import pandas as pd\n\ndef get_data(names):\n    print('Loading data...')\n\n    for name in names:\n        exec(f'{name} = pd.read_csv(\\'{name}.csv\\')', globals())\n\n    print('Data successfully loaded.)\n</code></pre>\n<p>main.py</p>\n<pre><code>from get_data import *\n\nnames = ['apple', 'banana', 'tomato']\nget_data(names)\n\napple.head()\n</code></pre>\n<p>I want to do this.</p>\n<p>But it is not working T.T</p>\n<p>What should I do</p>\n<p>Please help me...</p>\n",
      "creation": 1626830709,
      "score": 0,
      "user": {
        "id": 13840401,
        "name": "junglekim"
      },
      "comments": [
        {
          "id": 120995436,
          "body": "Not an answer to this question, but from a software design perspective, it would probably be easier, safer, and faster to return a <code>dict</code> of dataframes keyed <code>{name: pd.read_csv(f&#39;{name}.csv&#39;) for name in names}</code> from <code>gen_data</code> instead.",
          "user": {
            "id": 15497888,
            "name": "Henry Ecker"
          }
        }
      ],
      "answers": []
    },
    {
      "id": 68462993,
      "title": "python print format, read indentation value from a variable",
      "body": "<pre><code>print('{:&gt;85} '.format(&quot;PASS&quot;))\n</code></pre>\n<p>This is working fine,\nI want to read that 85 from a variable</p>\n<pre><code>indent = 85\nprint('{:&gt;indent} '.format(&quot;PASS&quot;))\n</code></pre>\n",
      "creation": 1626830723,
      "score": 0,
      "user": {
        "id": 6890628,
        "name": "GOPS"
      },
      "comments": [
        {
          "id": 120995476,
          "body": "Also <a href=\"https://stackoverflow.com/q/29044940/15497888\">How can you use a variable name inside a Python format specifier</a>",
          "user": {
            "id": 15497888,
            "name": "Henry Ecker"
          }
        },
        {
          "id": 120995569,
          "body": "You should be using f-strings by the way, they have advantages over <code>str.format()</code>.",
          "user": {
            "id": 14860,
            "name": "paxdiablo"
          }
        }
      ],
      "answers": []
    },
    {
      "id": 68462897,
      "title": "Force Bootstrap Columns to Stay Within Container",
      "body": "<p>I am trying to have a two row hierarchy display for some photos using bootstrap 5. However, rather than staying within the container the images overflow out. How can I make them dynamically resize to fit the container?</p>\n<pre class=\"lang-html prettyprint-override\"><code>&lt;link href=&quot;https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css&quot; rel=&quot;stylesheet&quot; /&gt;\n\n&lt;div class=&quot;container&quot; style=&quot;height: 100vh; background-color: yellow;&quot;&gt;\n    &lt;div class=&quot;row justify-content-center&quot;&gt;\n        &lt;div class=&quot;col col-12 col-md-4&quot;&gt;\n            &lt;img class=&quot;w-100 p-5&quot; src=&quot;https://via.placeholder.com/1080&quot; style=&quot;border-radius: 80px;&quot;&gt;\n        &lt;/div&gt;\n    &lt;/div&gt;\n    &lt;div class=&quot;row&quot;&gt;\n        &lt;div class=&quot;col col-12 col-md-4&quot;&gt;\n            &lt;img class=&quot;w-100 p-5&quot; src=&quot;https://via.placeholder.com/1080&quot; style=&quot;border-radius: 80px;&quot;&gt;\n        &lt;/div&gt;\n        &lt;div class=&quot;col col-12 col-md-4&quot;&gt;\n            &lt;img class=&quot;w-100 p-5&quot; src=&quot;https://via.placeholder.com/1080&quot; style=&quot;border-radius: 80px;&quot;&gt;\n        &lt;/div&gt;\n        &lt;div class=&quot;col col-12 col-md-4&quot;&gt;\n            &lt;img class=&quot;w-100 p-5&quot; src=&quot;https://via.placeholder.com/1080&quot; style=&quot;border-radius: 80px;&quot;&gt;\n        &lt;/div&gt;\n    &lt;/div&gt;\n&lt;/div&gt;\n</code></pre>\n<p>The elements are overflowing like this:\n<a href=\"https://i.stack.imgur.com/bABWX.png\" rel=\"nofollow noreferrer\"><img src=\"https://i.stack.imgur.com/bABWX.png\" alt=\"Overflowing images\" /></a></p>\n<p>I want it to instead scale down the images to look like this:\n<a href=\"https://i.stack.imgur.com/sKkWU.png\" rel=\"nofollow noreferrer\"><img src=\"https://i.stack.imgur.com/sKkWU.png\" alt=\"Images fitting\" /></a></p>\n<p>I tried setting a set height on the elements, but then they take up the whole screen as if the height is not defined relative to the container. Is there some different method I can use to display the images so that they change dynamically?</p>\n",
      "creation": 1626829520,
      "score": 1,
      "user": {
        "id": 12941336,
        "name": "Catogram"
      },
      "comments": [],
      "answers": [
        {
          "id": 68462987,
          "body": "<p>The only thing I can think of regarding your issue is the fact you have <code>height: 100vh</code> set on your container. Remove it.</p>\n<p>As you can see here, I added another row and your container scaled just fine;</p>\n<p><div class=\"snippet\" data-lang=\"js\" data-hide=\"false\" data-console=\"true\" data-babel=\"false\">\r\n<div class=\"snippet-code\">\r\n<pre class=\"snippet-code-html lang-html prettyprint-override\"><code>&lt;link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css\" rel=\"stylesheet\" /&gt;\n\n&lt;div class=\"container\" style=\"background-color: yellow;\"&gt;\n    &lt;div class=\"row justify-content-center\"&gt;\n        &lt;div class=\"col col-12 col-md-4\"&gt;\n            &lt;img class=\"w-100 p-5\" src=\"https://via.placeholder.com/1080\" style=\"border-radius: 80px;\"&gt;\n        &lt;/div&gt;\n    &lt;/div&gt;\n    &lt;div class=\"row\"&gt;\n        &lt;div class=\"col col-12 col-md-4\"&gt;\n            &lt;img class=\"w-100 p-5\" src=\"https://via.placeholder.com/1080\" style=\"border-radius: 80px;\"&gt;\n        &lt;/div&gt;\n        &lt;div class=\"col col-12 col-md-4\"&gt;\n            &lt;img class=\"w-100 p-5\" src=\"https://via.placeholder.com/1080\" style=\"border-radius: 80px;\"&gt;\n        &lt;/div&gt;\n        &lt;div class=\"col col-12 col-md-4\"&gt;\n            &lt;img class=\"w-100 p-5\" src=\"https://via.placeholder.com/1080\" style=\"border-radius: 80px;\"&gt;\n        &lt;/div&gt;\n    &lt;/div&gt;\n   &lt;div class=\"row\"&gt;\n        &lt;div class=\"col col-12 col-md-4\"&gt;\n            &lt;img class=\"w-100 p-5\" src=\"https://via.placeholder.com/1080\" style=\"border-radius: 80px;\"&gt;\n        &lt;/div&gt;\n        &lt;div class=\"col col-12 col-md-4\"&gt;\n            &lt;img class=\"w-100 p-5\" src=\"https://via.placeholder.com/1080\" style=\"border-radius: 80px;\"&gt;\n        &lt;/div&gt;\n        &lt;div class=\"col col-12 col-md-4\"&gt;\n            &lt;img class=\"w-100 p-5\" src=\"https://via.placeholder.com/1080\" style=\"border-radius: 80px;\"&gt;\n        &lt;/div&gt;\n    &lt;/div&gt;\n&lt;/div&gt;</code></pre>\r\n</div>\r\n</div>\r\n</p>\n<p>However, if you put the height back in, you will see not so fine;</p>\n<p><div class=\"snippet\" data-lang=\"js\" data-hide=\"false\" data-console=\"true\" data-babel=\"false\">\r\n<div class=\"snippet-code\">\r\n<pre class=\"snippet-code-html lang-html prettyprint-override\"><code>&lt;link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css\" rel=\"stylesheet\" /&gt;\n\n&lt;div class=\"container\" style=\"height: 100vh; background-color: yellow;\"&gt;\n    &lt;div class=\"row justify-content-center\"&gt;\n        &lt;div class=\"col col-12 col-md-4\"&gt;\n            &lt;img class=\"w-100 p-5\" src=\"https://via.placeholder.com/1080\" style=\"border-radius: 80px;\"&gt;\n        &lt;/div&gt;\n    &lt;/div&gt;\n    &lt;div class=\"row\"&gt;\n        &lt;div class=\"col col-12 col-md-4\"&gt;\n            &lt;img class=\"w-100 p-5\" src=\"https://via.placeholder.com/1080\" style=\"border-radius: 80px;\"&gt;\n        &lt;/div&gt;\n        &lt;div class=\"col col-12 col-md-4\"&gt;\n            &lt;img class=\"w-100 p-5\" src=\"https://via.placeholder.com/1080\" style=\"border-radius: 80px;\"&gt;\n        &lt;/div&gt;\n        &lt;div class=\"col col-12 col-md-4\"&gt;\n            &lt;img class=\"w-100 p-5\" src=\"https://via.placeholder.com/1080\" style=\"border-radius: 80px;\"&gt;\n        &lt;/div&gt;\n    &lt;/div&gt;\n   &lt;div class=\"row\"&gt;\n        &lt;div class=\"col col-12 col-md-4\"&gt;\n            &lt;img class=\"w-100 p-5\" src=\"https://via.placeholder.com/1080\" style=\"border-radius: 80px;\"&gt;\n        &lt;/div&gt;\n        &lt;div class=\"col col-12 col-md-4\"&gt;\n            &lt;img class=\"w-100 p-5\" src=\"https://via.placeholder.com/1080\" style=\"border-radius: 80px;\"&gt;\n        &lt;/div&gt;\n        &lt;div class=\"col col-12 col-md-4\"&gt;\n            &lt;img class=\"w-100 p-5\" src=\"https://via.placeholder.com/1080\" style=\"border-radius: 80px;\"&gt;\n        &lt;/div&gt;\n    &lt;/div&gt;\n&lt;/div&gt;</code></pre>\r\n</div>\r\n</div>\r\n</p>\n<p>Remember, if you set a height or width of an object it is BOUND to that restriction. If you remove width or height, it's dynamic or based on the object.</p>\n",
          "creation": 1626830670,
          "score": 1,
          "user": {
            "id": 13888590,
            "name": "Dexterians"
          },
          "accepted": false,
          "comments": []
        }
      ]
    },
    {
      "id": 68462977,
      "title": "How to change windows resolution programmatically java",
      "body": "<p>I want to change the resolution of windows, similar to the NVIDIA Control Panel, I want it also to stay so when other applications are loaded the resolution stays. Can this be done? If not, know any alternatives?</p>\n",
      "creation": 1626830546,
      "score": -3,
      "user": {
        "id": 16427935,
        "name": "Dafydd"
      },
      "comments": [
        {
          "id": 120995426,
          "body": "Does this help? <a href=\"https://stackoverflow.com/questions/11225113/change-screen-resolution-in-java\" title=\"change screen resolution in java\">stackoverflow.com/questions/11225113/&hellip;</a>",
          "user": {
            "id": 2164365,
            "name": "Abra"
          }
        }
      ],
      "answers": []
    },
    {
      "id": 68462981,
      "title": "Problems with load() on JQuery",
      "body": "<p>I'm now working with AJAX and I noticed that I cannot use <code>load()</code> function with JQuery,</p>\n<pre><code>$('#content').load('http://localhost/HTML/acerca_de.html' , '#content'); \n</code></pre>\n<p>I loaded a file on my local host and tried to print it at the html page with the id content.</p>\n<p>This is basic AJAX i used Jon Ducket Javascript book as reference but it doesn't work.</p>\n",
      "creation": 1626830605,
      "score": -1,
      "user": {
        "id": 16491742,
        "name": "Jonathan Almengot"
      },
      "comments": [
        {
          "id": 120995458,
          "body": "Welcome to SO. You might find reading the site <a href=\"https://stackoverflow.com/help\">help section</a> useful when it comes to <a href=\"https://stackoverflow.com/help/how-to-ask\">asking a good question</a>, and this <a href=\"https://meta.stackoverflow.com/questions/260648/stack-overflow-question-checklist\">question checklist</a>. Code that you&#39;ve worked on to solve the problem should include a <a href=\"https://stackoverflow.com/help/minimal-reproducible-example\">minimal reproducible example</a>, and be included in your question.",
          "user": {
            "id": 1377002,
            "name": "Andy"
          }
        },
        {
          "id": 120995516,
          "body": "you don&#39;t need a second parameter on load function -&gt; maybe try this: $(&#39;#content&#39;).load(&#39;<a href=\"http://localhost/HTML/acerca_de.html\" rel=\"nofollow noreferrer\">localhost/HTML/acerca_de.html</a>&#39; );",
          "user": {
            "id": 6057915,
            "name": "Daniel Resch"
          }
        },
        {
          "id": 120995634,
          "body": "The selector should be space delimted in the url string <code>&#39;...acerca_de.html #content&#39;</code>, not a separate argument",
          "user": {
            "id": 1175966,
            "name": "charlietfl"
          }
        }
      ],
      "answers": []
    },
    {
      "id": 68462955,
      "title": "SQL detecting changes in a column",
      "body": "<p>I have a table in my database</p>\n<p>Events</p>\n<pre><code>Date,Time,EventCode\n1/1/2020, 7AM, F\n1/2/2020, 8AM, N\n1/3/2020, 9AM, S\n1/4/2020, 9AM, L\n1/6/2020, 9AM, Z\n</code></pre>\n<p>I am learning how to write a query that can detect when the EventCode changed from N to any value after N. We don't care about values prior to N.</p>\n<p>The date is provided because my query needs a start date and end date.\nTherefore if I am searching for data that occurred from 1/3/2020 to 1/6/2020, we would have NO data to report because there was no initial EventCode of N present.</p>\n<p>However if we modified the query to  1/2/2020 to 1/3/2020, we would get 2 rows. The first row (which is the row containing the EventCode N) and the row immediately after.</p>\n<p>Will be using SQL Server 2016 and SQL Server 2019</p>\n",
      "creation": 1626830249,
      "score": 0,
      "user": {
        "id": 399508,
        "name": "software is fun"
      },
      "comments": [
        {
          "id": 120995380,
          "body": "1/3/2020 Is that March 1st or January 3rd?",
          "user": {
            "id": 2164365,
            "name": "Abra"
          }
        }
      ],
      "answers": [
        {
          "id": 68462989,
          "body": "<p>You can use <code>LEAD()</code> and <code>LAG()</code> to peek at the next and previous rows respectively. Using these functions you can write:</p>\n<pre><code>select\n  date, time, eventcode\nfrom (\n  select *,\n    lead(eventcode) over(order by date) as next_code\n    lag(eventcode) over(order by date) as prev_code\n  from events\n  where date between '2020-01-03' and '2020-01-06'\n) x\nwhere eventcode = 'N' and next_code &lt;&gt; 'N'\n   or eventcode &lt;&gt; 'N' and prev_code = 'N'\n</code></pre>\n",
          "creation": 1626830684,
          "score": 0,
          "user": {
            "id": 6436191,
            "name": "The Impaler"
          },
          "accepted": false,
          "comments": []
        }
      ]
    },
    {
      "id": 68462957,
      "title": "Django Invalid Filter",
      "body": "<p>I'm getting the following error message from my API request:</p>\n<pre><code>{\n    &quot;errors&quot;: [\n        {\n            &quot;detail&quot;: &quot;Select a valid choice. That choice is not one of the available choices.&quot;,\n            &quot;status&quot;: &quot;400&quot;,\n            &quot;source&quot;: {\n                &quot;pointer&quot;: &quot;/data/attributes/branch&quot;\n            },\n            &quot;code&quot;: &quot;invalid_choice&quot;\n        }\n    ]\n}\n</code></pre>\n<p>I'm struggling with this since is have other ViewSets which follow the same structure but won't break once I try to filter by an FK.</p>\n<p>Below is the endpoint I'm hitting:</p>\n<pre><code>http://localhost:8000/templates/?page[number]=1&amp;filter[branch]=7KzZ5vLWlydlNbG&amp;filter[name]=Client%20Portal%20Invitation\n</code></pre>\n<p>For context I have a backend using Django DRF JsonAPI. It is structured as follow:</p>\n<p><strong>Model:</strong></p>\n<pre><code>class Template(BaseModel):\n    id = HashidUnsignedAutoField(db_column=&quot;template_id&quot;, primary_key=True, salt=&quot;Template&quot;, min_length=11)\n    branch = ForeignKey(to=&quot;Branch&quot;, on_delete=DO_NOTHING)\n    name = CharField(max_length=128)\n\n    class Meta(BaseModel.Meta):\n        db_table = &quot;Templates&quot;\n        managed = False\n</code></pre>\n<p><strong>Serializer:</strong></p>\n<pre><code>class TemplateSerializer(BaseSerializer):\n    included_serializers = {\n        &quot;branch&quot;: &quot;app.serializers.BranchSerializer&quot;,\n    }\n\n    class Meta(BaseSerializer.Meta):\n        model = Template\n</code></pre>\n<p><strong>ViewSet:</strong></p>\n<pre><code>class TemplateViewSet(BaseViewSet):\n    queryset = Template.objects.all()\n    serializer_class = TemplateSerializer\n    filterset_class = TemplateFilterSet\n</code></pre>\n<p><strong>Filterset:</strong></p>\n<pre><code>class TemplateFilterSet(BaseFilterSet):\n    class Meta:\n        model = Template\n        fields = {\n            &quot;branch&quot;: [&quot;exact&quot;, &quot;in&quot;],\n            &quot;name&quot;: [&quot;exact&quot;],\n        }\n</code></pre>\n<p>Any hints on why would I be getting this error message would be greatly appreciated.</p>\n",
      "creation": 1626830266,
      "score": 0,
      "user": {
        "id": 9745257,
        "name": "PeterD"
      },
      "comments": [],
      "answers": []
    },
    {
      "id": 68462965,
      "title": "javascript &#39;this &#39;keyword in nested object return undefined",
      "body": "<p>This return undefined</p>\n<pre><code> cat = {\n  category: &quot;Great dane&quot;,\n  object: {\n  type: &quot;ccc&quot;,\n  getType() {\n    alert(this.category); //why this cannot access category\n  }\n  }\n}\n\ncat.object.getType();\n</code></pre>\n<p>this retun the value 'great dane'</p>\n<pre><code> dog = {\n  type: &quot;Great dane&quot;,\n  getType() {\n    // this = dog\n    alert(this.type); //why this can access type\n  }\n}\n\ndog.getType();\n</code></pre>\n<p>can anybody explain what is the different between the two ?</p>\n",
      "creation": 1626830376,
      "score": 0,
      "user": {
        "id": 16403602,
        "name": "akmal hazim"
      },
      "comments": [
        {
          "id": 120995379,
          "body": "<code>cat.object.getType()</code> since this code begins with <code>cat.object</code>, <code>this</code> will be set equal to <code>cat.object</code>. <code>cat.object</code> has no <code>.category</code> property (but it does have a <code>.type</code> property)",
          "user": {
            "id": 3794812,
            "name": "Nicholas Tower"
          }
        }
      ],
      "answers": []
    },
    {
      "id": 68463019,
      "title": "How can i put my searchbox and navbar at the same line?",
      "body": "<p>I'm trying to make my search box in the same line with the &quot;home, about, contact...&quot; stuff but it doesn't seem to worrk, i guess my CSS just not enough to make that, can anyone help me to make them stand in the same line? Thank you so much!</p>\n<p>This is css:</p>\n<pre><code>.container{\n\n    background-color: #A3318A;\n}\n\n.container ul{\n    display: inline block;\n\n}\n\n.container ul li {\n    \n    display: inline;\n    padding:15px;\n    font-size: 1.5rem;\n    color: white;\n\n}\n</code></pre>\n<p>This is my html:</p>\n<pre><code>&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n&lt;head&gt;\n    &lt;title&gt;&lt;/title&gt;\n    &lt;link rel=&quot;stylesheet&quot;  href=&quot;style.css&quot;&gt;\n    &lt;script src=&quot;https://kit.fontawesome.com/48a972c999.js&quot; crossorigin=&quot;anonymous&quot;&gt;&lt;/script&gt;\n&lt;/head&gt;\n&lt;body&gt;\n\n    &lt;div class=&quot;container&quot;&gt;\n        &lt;ul&gt;\n            &lt;li&gt;Home&lt;/li&gt;\n            &lt;li&gt;About&lt;/li&gt;\n            &lt;li&gt;News&lt;/li&gt;\n            &lt;li&gt;Contact&lt;/li&gt;\n        &lt;/ul&gt;\n        &lt;form&gt;\n            &lt;input class=&quot;input&quot; type=&quot;text&quot; placeholder=&quot;Search here...&quot;&gt;\n            &lt;i class=&quot;fas fa-search&quot;&gt;&lt;/i&gt;\n        &lt;/form&gt;\n    &lt;/div&gt;\n\n&lt;/body&gt;\n&lt;/html&gt;\n</code></pre>\n<p><a href=\"https://i.stack.imgur.com/zFiCk.png\" rel=\"nofollow noreferrer\"><img src=\"https://i.stack.imgur.com/zFiCk.png\" alt=\"my image\" /></a></p>\n",
      "creation": 1626831097,
      "score": 0,
      "user": {
        "id": 16389635,
        "name": "Nương Đ&#224;m Thị"
      },
      "comments": [
        {
          "id": 120995517,
          "body": "You&#39;ll need to make the form <code>inline-block</code>, too.",
          "user": {
            "id": 1902010,
            "name": "ceejayoz"
          }
        }
      ],
      "answers": [
        {
          "id": 68463058,
          "body": "<p>Make <code>form</code> with <code>display: inline-block</code>:</p>\n<pre><code>form, /* added */\n.container ul{\n  display: inline-block; /* fixed */\n}\n</code></pre>\n",
          "creation": 1626831564,
          "score": 0,
          "user": {
            "id": 2930038,
            "name": "vanowm"
          },
          "accepted": false,
          "comments": []
        }
      ]
    },
    {
      "id": 68462907,
      "title": "Communication between components in layout",
      "body": "<p>I have a <code>Layout.jsx</code> to define a layout for the whole website. It consists of:</p>\n<ul>\n<li>Navigation bar (always same content for all pages)</li>\n<li>Sub Header (changes based on each page)</li>\n<li>Content (actual content of the page)</li>\n<li>Aside, Footer, ... for simplicity we ignore these in this example.</li>\n</ul>\n<p>On one of the page's Sub Header, (report page sub header) I want to have a <code>&lt;Tab&gt;</code>: &quot;Chart View&quot; and &quot;Table View&quot;.</p>\n<ul>\n<li>When user clicks on Chart, the content of the layout displays <code>&lt;ChartView /&gt;</code> and if clicks on &quot;Table View&quot; the content of the main page displays <code>&lt;TableView /&gt;</code></li>\n</ul>\n<p>Layout.jsx</p>\n<pre><code>function Layout() {\n  // Define all the pages and their routes/content/subheader ...\n  const pages = [\n    {\n      path: '/user',\n      content: &lt;UserPage /&gt;,\n      subheader: &lt;UserSubHeader /&gt;\n    },\n    {\n      path: '/report',\n      content: &lt;ReportPage /&gt;,\n      subHeader: &lt;ReportSubHeader /&gt;\n    }\n  ];\n  return(\n    &lt;&gt;\n      &lt;div class=&quot;Navbar&quot;&gt;&lt;Navbar /&gt;&lt;/div&gt;\n      &lt;Sidebar /&gt;\n      {pages.map(page =&gt; (  // &lt;-------- Loop thought the pages array and render using a Switch and Router.\n        &lt;Route path={page.path}&gt;\n          &lt;div class=&quot;subheader&quot;&gt;\n            {page.subheader}\n          &lt;/div&gt;\n          &lt;div class=&quot;main&quot;&gt;\n          {page.content}\n          &lt;/div&gt;\n        &lt;/Route&gt;\n      ))}\n    &lt;/&gt;\n  );\n}\n</code></pre>\n<p>ReportSubHeader.jsx</p>\n<pre><code>function ReportSubHeader() {\n  return(\n    &lt;Tabs value={value} onChange={handleChange} &gt;\n          &lt;Tab label=&quot;Chart View&quot;  /&gt;\n          &lt;Tab label=&quot;Table View&quot;  /&gt;\n    &lt;/Tabs&gt;\n  )\n}\n</code></pre>\n<p>ReportPage.jsx</p>\n<pre><code>function ReportPage() {\n  // if first Tab is selected display Chart View,\n  // otherwise display TableView\n  return (\n    &lt;&gt;\n    &lt;TabPanel&gt;\n      &lt;ChartView /&gt;\n    &lt;/TabPanel&gt;\n    &lt;TabPanel&gt;\n      &lt;TableView /&gt;\n    &lt;/TabPanel&gt;\n  &lt;/&gt;);\n}\n</code></pre>\n<p><strong>Questions</strong></p>\n<ol>\n<li><p>How to implement this so that the two components can communicate (clicking on ReportSubHeader, causes change in the ReportPage selected tab)?</p>\n</li>\n<li><p>Is this a good way of defining the layout? (when I might have communication parts in the layout)</p>\n</li>\n</ol>\n<p><strong>Notes</strong></p>\n<ul>\n<li>One thing I can think of is using Application Context.</li>\n<li>Apparently Material UI <code>&lt;Tab&gt;</code> and its <code>&lt;TabPanel&gt;</code> cannot be in separate components (as far as I know.) I'm ok to create a custom Tab component for this purpose.</li>\n</ul>\n",
      "creation": 1626829676,
      "score": 0,
      "user": {
        "id": 4505446,
        "name": "A-Sharabiani"
      },
      "comments": [],
      "answers": []
    },
    {
      "id": 68462597,
      "title": "Convert an string to object with duplicate keys to an array",
      "body": "<p>I have a string that needs to be converted to an object. But the string has the duplicated items. Since JSON Objects cannot contain 2 items with the same key. The second item is overwriting the first item.\nHow to merge the duplicate items and push to an array?</p>\n<pre><code>var string = &quot;test-1=owner&amp;test-1=driver&amp;test-2=Yes&amp;test-3=2&amp;test-4=sun&amp;test-4=moon&amp;test-5=not-agree&amp;test-6=dogs&amp;test-6=testing+js+object&amp;test-7=Testing+js+function&amp;test-7=Testing+js+array&quot;\n\nvar stringMod = string.split(&quot;&amp;&quot;);\n\n\nvar stringObj = {};\n\nstringMod.forEach(function(json) {\n  var jsonSplit = json.split(&quot;=&quot;);\n\n  stringObj[jsonSplit[0]] = [jsonSplit[1]];\n});\n\nconsole.log(stringObj,'stringObj');\n</code></pre>\n<p>Desired output:</p>\n<pre><code>{\n  &quot;test-1&quot;: [&quot;owner&quot;,&quot;driver&quot;],\n  &quot;test-2&quot;: [&quot;Yes&quot;],\n  &quot;test-3&quot;: [&quot;2&quot;],\n  &quot;test-4&quot;: [&quot;sun&quot;,&quot;moon&quot;],\n  &quot;test-5&quot;: [&quot;not-agree&quot;],\n  &quot;test-6&quot;: [&quot;dogs&quot;,&quot;testing+js+object&quot;],\n  &quot;test-7&quot;: [&quot;Testing+js+function&quot;,&quot;Testing+js+array&quot;]\n}\n</code></pre>\n<p>Here is the link to working fiddle: <a href=\"https://jsfiddle.net/sjoh9rqp/\" rel=\"nofollow noreferrer\">https://jsfiddle.net/sjoh9rqp/</a></p>\n<p>Can you help me how to accomplish this ?</p>\n",
      "creation": 1626825806,
      "score": 0,
      "user": {
        "id": 7921161,
        "name": "virat"
      },
      "comments": [
        {
          "id": 120994799,
          "body": "Using <code>[...(stringObj?.[jsonSplit[0]] || []), jsonSplit[1]];</code> might work. (It&#39;s not pretty though)",
          "user": {
            "id": 989920,
            "name": "evolutionxbox"
          }
        }
      ],
      "answers": [
        {
          "id": 68462654,
          "body": "<p>For variety, here's the answer solved with reduce(), though I have to admit URLSearchParams is more elegant</p>\n<p><div class=\"snippet\" data-lang=\"js\" data-hide=\"false\" data-console=\"true\" data-babel=\"false\">\r\n<div class=\"snippet-code\">\r\n<pre class=\"snippet-code-js lang-js prettyprint-override\"><code>var string = \"test-1=owner&amp;test-1=driver&amp;test-2=Yes&amp;test-3=2&amp;test-4=sun&amp;test-4=moon&amp;test-5=not-agree&amp;test-6=dogs&amp;test-6=testing+js+object&amp;test-7=Testing+js+function&amp;test-7=Testing+js+array\"\n\nlet obj = string.split('&amp;').reduce((b,a) =&gt; {\n  let t = a.split('=');\n  if (b.hasOwnProperty(t[0])) b[t[0]].push(t[1]);\n  else  b[t[0]] =[t[1]];\n  return b;\n},{});\nconsole.log(obj)</code></pre>\r\n</div>\r\n</div>\r\n</p>\n",
          "creation": 1626826470,
          "score": 0,
          "user": {
            "id": 1772933,
            "name": "Kinglish"
          },
          "accepted": false,
          "comments": []
        },
        {
          "id": 68462672,
          "body": "<p>You can use a URLSearchParams to accomplish this, since it treats the string as url parameters it does do decoding though.</p>\n<p><div class=\"snippet\" data-lang=\"js\" data-hide=\"false\" data-console=\"true\" data-babel=\"false\">\r\n<div class=\"snippet-code\">\r\n<pre class=\"snippet-code-js lang-js prettyprint-override\"><code>var string = \"test-1=owner&amp;test-1=driver&amp;test-2=Yes&amp;test-3=2&amp;test-4=sun&amp;test-4=moon&amp;test-5=not-agree&amp;test-6=dogs&amp;test-6=testing+js+object&amp;test-7=Testing+js+function&amp;test-7=Testing+js+array\"\n\nvar data = new URLSearchParams(string);\nvar obj = {};\nfor (let x of data.keys()){\n  obj[x] = data.getAll(x);\n}\nconsole.log(obj);</code></pre>\r\n</div>\r\n</div>\r\n</p>\n",
          "creation": 1626826610,
          "score": 3,
          "user": {
            "id": 1353011,
            "name": "Musa"
          },
          "accepted": false,
          "comments": []
        },
        {
          "id": 68462682,
          "body": "<p>Using URLSearchParams to parse the query string helps simplify this</p>\n<p><div class=\"snippet\" data-lang=\"js\" data-hide=\"false\" data-console=\"true\" data-babel=\"false\">\r\n<div class=\"snippet-code\">\r\n<pre class=\"snippet-code-js lang-js prettyprint-override\"><code>var string = \"test-1=owner&amp;test-1=driver&amp;test-2=Yes&amp;test-3=2&amp;test-4=sun&amp;test-4=moon&amp;test-5=not-agree&amp;test-6=dogs&amp;test-6=testing+js+object&amp;test-7=Testing+js+function&amp;test-7=Testing+js+array\"\n\nconst params = new URLSearchParams(string),\n      res = {};\n\n\nparams.forEach((v,k)=&gt; { \n  res[k] = res[k] || []\n  res[k].push(v);  \n})\n\nconsole.log(res)</code></pre>\r\n</div>\r\n</div>\r\n</p>\n",
          "creation": 1626826773,
          "score": 3,
          "user": {
            "id": 1175966,
            "name": "charlietfl"
          },
          "accepted": false,
          "comments": []
        }
      ]
    },
    {
      "id": 68462861,
      "title": "Vector declared in header file isn&#39;t being recognized C++",
      "body": "<p>I have been having a lot of issues with header files, and now it seems that the vector that is declared in my header file, Polynomial.hpp, is not being recognized in Polynomial.cpp. I have already included std:: which seems to be a common mistake, so I don't know where to go from here.</p>\n<p>Header file:</p>\n<pre><code>#ifndef POLYNOMIAL_HPP\n#define POLYNOMIAL_HPP\n\n#include&lt;vector&gt;\n#include&quot;term.hpp&quot;\n\nclass Polynomial {\n    \nprivate:\n    std::vector&lt;Term&gt; vect;\n    \npublic:\n    Polynomial();\n    ~Polynomial();\n    void add(Term t);\n    void print();\n    Polynomial combineLikeTerms();\n    \n};\n\n#endif\n</code></pre>\n<p>cpp File:</p>\n<pre><code>#include &quot;term.hpp&quot;\n#include &quot;Polynomial.hpp&quot;\n#include&lt;iostream&gt;\n#include&lt;map&gt;\n\nusing namespace std;\n\nvoid add(Term t) {\n    vect.push_back(t);\n}\n\nvoid print() {\n    for(int i = 0; i &lt; vect.size(); i++) {\n        cout &lt;&lt; vect[i].toString();\n    }\n}\n    \nPolynomial combineLikeTerms() {\n    Polynomial poly;\n    map&lt;int, int&gt; combinedPoly;\n    \n    for(int j = 0; j &lt; vect.size(); j++)\n    {\n        combinedPoly.insert(pair&lt;int, int&gt;(vect[j].getExponent(), vect[j].getCoefficient());\n    }\n                            \n    for(map&lt;int,int&gt;::iterator itr = combinedPoly.begin(); itr != combinedPoly.end(); itr++) {\n            Term newTerm(itr-&gt;second, &quot;x&quot;, itr-&gt;first);\n            poly.add(newTerm);\n        }\n        \n    return poly;\n                    \n}\n</code></pre>\n<p>Error (1/6):</p>\n<blockquote>\n<p>Polynomial.cpp:9:5: error: use of undeclared identifier 'vect'\nvect.push_back(t);</p>\n</blockquote>\n",
      "creation": 1626829098,
      "score": 0,
      "user": {
        "id": 14471249,
        "name": "mad"
      },
      "comments": [
        {
          "id": 120995227,
          "body": "<code>void Polynomial::add(Term t) { ... }</code> and the same for the rest of the member functions you want to implement outside the header.",
          "user": {
            "id": 920069,
            "name": "Retired Ninja"
          }
        },
        {
          "id": 120995228,
          "body": "<code>void add(Term t) {...}</code> is not defining the member function. You mean <code>void Polynomoal::add(Term t) {...}</code>",
          "user": {
            "id": 1413244,
            "name": "jwezorek"
          }
        }
      ],
      "answers": [
        {
          "id": 68462887,
          "body": "<p>In Polynomial.cpp you are defining new functions instead of member functions. Change the definitions to use the class name like</p>\n<pre><code>void Polynomial::add(Term t) {\n    vect.push_back(t);\n}\n</code></pre>\n",
          "creation": 1626829438,
          "score": 1,
          "user": {
            "id": 1413244,
            "name": "jwezorek"
          },
          "accepted": false,
          "comments": []
        },
        {
          "id": 68462904,
          "body": "<p>Your void add(Term T) in Polynomial.cpp is not the member function of the Polynomial.\nYou must implement this function as member of Polynomial like this</p>\n<pre><code>void Polynomial::add(Term T){\n...\n}\n</code></pre>\n",
          "creation": 1626829629,
          "score": 1,
          "user": {
            "id": 8589793,
            "name": "secuman"
          },
          "accepted": false,
          "comments": []
        },
        {
          "id": 68462932,
          "body": "<p>I think this is a syntax error. First, you defined the add method in the Polynomial class of the header file, but the CPP file did not add the class scope, which caused this problem. So you should adjust your code like this:</p>\n<pre class=\"lang-cpp prettyprint-override\"><code>void Polynomial::add(Term t) {\n    vect.push_back(t);\n}\n</code></pre>\n<p>The root cause of this problem is that the methods of the class only work within the scope of the class, and if there is a function with the same name inside the class, it will lead to a naming conflict. Therefore, the root cause of this problem is not the reference error of the vector file.</p>\n",
          "creation": 1626829997,
          "score": 1,
          "user": {
            "id": 12526570,
            "name": "Panda"
          },
          "accepted": false,
          "comments": [
            {
              "id": 120995526,
              "body": "To use C++ parlance, if you want to &#39;implement&#39; the method <code>add</code> that you &#39;declared&#39; to be part of your class <code>Polynomial</code>  in a .cpp file, you need to use the correct syntax to tell the compiler that the method is part of the class. Otherwise it will not know to include other class members (e.g. <code>vect</code>) in the scope of the method implementation. Hence: <code>void Polynomial::add(...)</code>. The method signature <code>add(...)</code> in the .cpp file tells the compiler that there is <i>another</i> method outside of the class <code>Polynomial</code> called <code>add</code> and that method will not have access to the members of <code>Polynomial</code>.",
              "user": {
                "id": 4525932,
                "name": "dmedine"
              }
            }
          ]
        },
        {
          "id": 68462954,
          "body": "<p>The issue is that instead of defining the members <code>add</code> and <code>print</code> of the class <code>Polynomial</code>, you are defining functions in global scope completely unrelated to the class <code>Polynomial</code></p>\n<p>Make changes in the function definition of <code>void add(Term)</code> and <code>void print()</code> to <code>void Polynomial::add(Term)</code> and <code>void Polynomial::print()</code>.</p>\n<pre class=\"lang-cpp prettyprint-override\"><code>#include &quot;term.hpp&quot;\n#include &quot;Polynomial.hpp&quot;\n#include&lt;iostream&gt;\n#include&lt;map&gt;\n\nusing namespace std;\n\nvoid Polynomial::add(Term t) { // change here\n    vect.push_back(t);\n}\n\nvoid Polynomial::print() { //change here\n    for(int i = 0; i &lt; vect.size(); i++) {\n        cout &lt;&lt; vect[i].toString();\n    }\n}\n    \nPolynomial combineLikeTerms() {\n    Polynomial poly;\n    map&lt;int, int&gt; combinedPoly;\n    \n    for(int j = 0; j &lt; vect.size(); j++)\n    {\n        combinedPoly.insert(pair&lt;int, int&gt;(vect[j].getExponent(), vect[j].getCoefficient());\n    }\n                            \n    for(map&lt;int,int&gt;::iterator itr = combinedPoly.begin(); itr != combinedPoly.end(); itr++) {\n            Term newTerm(itr-&gt;second, &quot;x&quot;, itr-&gt;first);\n            poly.add(newTerm);\n        }\n        \n    return poly;\n                    \n}\n</code></pre>\n",
          "creation": 1626830242,
          "score": 0,
          "user": {
            "id": 12513900,
            "name": "Anubhav Gupta"
          },
          "accepted": false,
          "comments": []
        }
      ]
    },
    {
      "id": 68462550,
      "title": "I need help on comparing using operators in a guessing game - tkinter",
      "body": "<p>So basically, I am making a guessing game in Tkinter. I am comparing numbers to check if the number the user has guessed is greater, lesser, or the same compared to the randomly generated number. I am getting an error about my operator so please provide the correct code, thanks. Here is my code:</p>\n<pre class=\"lang-py prettyprint-override\"><code>from tkinter import messagebox\nimport random\nfrom tkinter import *\nroot = Tk()\nr = random.randint(1,100)\nroot.title(&quot;Game thing&quot;)\ndef clear():\n    number_entry1.delete(0,END)\ndef quit():\n    exit()\ndef Guessnumber():\n    if number_entry1.get() &gt; int(r):\n        m1 = messagebox.showinfo(&quot;Sorry&quot;,&quot;Lower&quot;)\n    elif number_entry1.get() &lt; int(r):\n        m2 = messagebox.showinfo(&quot;Sorry&quot;,&quot;Higher&quot;)\n    else:\n        m3 = messagebox.showinfo(&quot;Congratulations&quot;,&quot;You Got It!&quot;)\n\nmessage_label = Label(root,text = &quot;Guess the number form (1 - 100)&quot;)\nmessage_label.grid(row = 0, column = 0)\nnumber_entry1 = Entry(root)\nnumber_entry1.grid(row = 0, column = 1,columnspan = 2)\nguess_button = Button(root,text = &quot;Guess Number&quot;,fg = &quot;green&quot;,command = Guessnumber)\nguess_button.grid(row = 1, column = 0, sticky = W)\nclear_button = Button(root,text = &quot;Clear&quot;,fg = &quot;blue&quot;,command = clear)\nclear_button.grid(row = 1, column = 1, sticky = W)\nquit_button = Button(root,text = &quot;Quit&quot;,fg = &quot;red&quot;,command = exit)\nquit_button.grid(row = 1, column = 2, sticky = E)\n</code></pre>\n<p>Thanks!!! Also if you could I would like an explanation on why I am getting an error.\nAgain thanks for all the help everyone</p>\n",
      "creation": 1626825353,
      "score": 0,
      "user": {
        "id": 16139854,
        "name": "TheCodeMan"
      },
      "comments": [
        {
          "id": 120995207,
          "body": "What error and what operators?",
          "user": {
            "id": 355230,
            "name": "martineau"
          }
        }
      ],
      "answers": [
        {
          "id": 68462591,
          "body": "<p>The error (which you should have provided in the question but I already detected it) is caused because You compare a string with an integer here:</p>\n<pre class=\"lang-py prettyprint-override\"><code>def Guessnumber():\n    if number_entry1.get() &gt; int(r):\n        m1 = messagebox.showinfo(&quot;Sorry&quot;,&quot;Lower&quot;)\n    elif number_entry1.get() &lt; int(r):\n        m2 = messagebox.showinfo(&quot;Sorry&quot;,&quot;Higher&quot;)\n    else:\n        m3 = messagebox.showinfo(&quot;Congratulations&quot;,&quot;You Got It!&quot;)\n</code></pre>\n<p>Why? because using the <code>.get()</code> method of <code>Entry</code> widgets returns the value of what was entered in the widget as a string, so the simple solution would be this:</p>\n<pre class=\"lang-py prettyprint-override\"><code>def Guessnumber():\n    if int(number_entry1.get()) &gt; int(r):\n        m1 = messagebox.showinfo(&quot;Sorry&quot;,&quot;Lower&quot;)\n    elif int(number_entry1.get()) &lt; int(r):\n        m2 = messagebox.showinfo(&quot;Sorry&quot;,&quot;Higher&quot;)\n    else:\n        m3 = messagebox.showinfo(&quot;Congratulations&quot;,&quot;You Got It!&quot;)\n</code></pre>\n<p>Oh, and also to mention, this is not necessary: <code>int(r)</code>, because the function <code>random.randint(1,100)</code> already returns an integer so converting it again is redundant.</p>\n<p>And also the function <code>quit()</code> is quite useless since the only thing defined there is the built-in <code>exit()</code> which actually is the same length as in characters so kinda pointless without other functionality</p>\n<p>The &quot;final version&quot; of how that function &quot;should&quot; (to the best practices I know) look is this (also includes some <a href=\"https://www.python.org/dev/peps/pep-0008/\" rel=\"nofollow noreferrer\">PEP 8 - Style Guide for Python Code</a> suggestions and also that there is now only one <code>.get()</code> call which theoretically improves performance since now the method in all cases has to be called only once):</p>\n<pre class=\"lang-py prettyprint-override\"><code>def guess_number():\n    user_input = int(number_entry1.get())\n    if user_input &gt; r:\n        messagebox.showinfo(&quot;Sorry&quot;, &quot;Lower&quot;)\n    elif user_input &lt; r:\n        messagebox.showinfo(&quot;Sorry&quot;, &quot;Higher&quot;)\n    else:\n        messagebox.showinfo(&quot;Congratulations&quot;, &quot;You Got It!&quot;)\n</code></pre>\n",
          "creation": 1626825759,
          "score": 3,
          "user": {
            "id": 14531062,
            "name": "Matiiss"
          },
          "accepted": false,
          "comments": [
            {
              "id": 120994791,
              "body": "Thanks a lot! I thought the error was that the variable r was the string. so I made that in(r). I didn&#39;t realize it was number_entry1.get(). Also I&#39;ll make sure to put the error if I have one in my question next time I post. Thanks Again!",
              "user": {
                "id": 16139854,
                "name": "TheCodeMan"
              }
            },
            {
              "id": 120995195,
              "body": "You forgot to mention that since <code>messagebox.showinfo()</code> doesn&#39;t really return any useful information, the assignment of its return value to <code>m1</code>, <code>m2</code>, or <code>m3</code> serves no purpose.",
              "user": {
                "id": 355230,
                "name": "martineau"
              }
            },
            {
              "id": 120995244,
              "body": "@martineau I added a &quot;final version&quot; to include all the possible little improvements (that I could think of) including what you mentioned about msgboxes",
              "user": {
                "id": 14531062,
                "name": "Matiiss"
              }
            },
            {
              "id": 120995265,
              "body": "Congratulations, You Got It! ;&#172;)",
              "user": {
                "id": 355230,
                "name": "martineau"
              }
            }
          ]
        }
      ]
    }
]