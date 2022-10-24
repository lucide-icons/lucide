package dev.lucide.lucide

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathFillType.Companion.NonZero
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap.Companion.Round
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.ImageVector.Builder
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.unit.dp
import dev.lucide.Lucide

public val Lucide.Framer: ImageVector
    get() {
        if (_framer != null) {
            return _framer!!
        }
        _framer = Builder(name = "Framer", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(5.0f, 16.0f)
                verticalLineTo(9.0f)
                horizontalLineToRelative(14.0f)
                verticalLineTo(2.0f)
                horizontalLineTo(5.0f)
                lineToRelative(14.0f, 14.0f)
                horizontalLineToRelative(-7.0f)
                moveToRelative(-7.0f, 0.0f)
                lineToRelative(7.0f, 7.0f)
                verticalLineToRelative(-7.0f)
                moveToRelative(-7.0f, 0.0f)
                horizontalLineToRelative(7.0f)
            }
        }
        .build()
        return _framer!!
    }

private var _framer: ImageVector? = null
