        onInit();

        produtos = [{id:1,
          name: "Açafrão",
          days: 10

        },
        {
          id:2,
          name: "Alface",
          days: 5

        },
        {
          id:3,
          name: "Almeirão",
          days: 11

        },
        {
          id:4,
          name: "Beringela",
          days: 5

        },
        {
          id:5,
          name: "Beterraba",
          days: 12

        },
        {
          id:6,
          name: "Cebola Cabeça",
          days: 12

        }
      ];


        console.log("carregando main.js");
        console.log(produtos);
        // criar lista dinamicamente
        var cList = $('ul.list-group.checked-list-box')
        $.each(produtos, function(i)
        {
          var li = $('<li/>')
              .addClass('list-group-item')
              .text(produtos[i].name)
              .appendTo(cList);

        });


        

        $(function () 
        {
            $('.list-group.checked-list-box .list-group-item').each(function () 
            {

            // Settings
            var $widget = $(this),
            $checkbox = $('<input type="checkbox" class="hidden" />'),
            color = ($widget.data('color') ? $widget.data('color') : "primary"),
            style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-"),
            settings = 
            {
                on: 
                {
                icon: 'glyphicon glyphicon-check'
                },
                off: 
                {
                icon: 'glyphicon glyphicon-unchecked'
                }
            };

                $widget.css('cursor', 'pointer');
                $widget.append($checkbox);

                // Event Handlers
                $widget.on('click', function () 
                {
                    $checkbox.prop('checked', !$checkbox.is(':checked'));
                    $checkbox.triggerHandler('change');
                    updateDisplay();
                });
                $checkbox.on('change', function () 
                {
                    updateDisplay();
                });
           

          // Actions
          function updateDisplay() 
            {
              var isChecked = $checkbox.is(':checked');

              // Set the button's state
              $widget.data('state', (isChecked) ? "on" : "off");

              // Set the button's icon
              $widget.find('.state-icon')
                  .removeClass()
                  .addClass('state-icon ' + settings[$widget.data('state')].icon);

              // Update the button's color
                if (isChecked)
                {
                    $widget.addClass(style + color + ' active');
                } 
                else 
                {
                    $widget.removeClass(style + color + ' active');
                }
            }

              // Initialization
                function init() 
                {
                    if ($widget.data('checked') == true) 
                    {
                        $checkbox.prop('checked', !$checkbox.is(':checked'));
                    }
                    updateDisplay();

                    // Inject the icon if applicable
                    if ($widget.find('.state-icon').length == 0) 
                    {
                    $widget.prepend('<span class="state-icon ' + settings[$widget.data('state')].icon + '"></span>');
                    }
                }
            init();
            });
            
        });
    